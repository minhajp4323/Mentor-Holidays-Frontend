import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Container,
  Box,
  Button,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Header from "../navbar/Navbar";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import userInstance from "../../Interceptors/UserInterceptors";

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  display: flex;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 1rem;
  font-family: inherit;
  font-weight: 500;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[300]};
  border-radius: 4px;
  padding: 8px;
  width: 3rem;
  text-align: center;
  margin: 0 8px;
  outline: 0;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-size: 1rem;
  font-family: inherit;
  font-weight: 500;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[300]};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.palette.mode === "dark" ? blue[800] : blue[200]};
    color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};
  }

  &:focus {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }
`
);

function ViewProduct() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [property, setProperty] = useState(null);
  const [guestNumber, setGuestNumber] = useState(1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [maxGuest, setMaxGuest] = useState(0);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get(`/user/properties/${_id}`);
        setProperty(response.data.data);
        setMaxGuest(response.data.data.maxGuest);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [_id]);

  useEffect(() => {
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(diffDays);

    if (property) {
      const basePrice = diffDays * property.price;
      const discount = diffDays > 3 ? 0.05 * basePrice : 0;
      setTotalPrice(basePrice - discount);
      setDiscountAmount(discount);
    }
  }, [checkInDate, checkOutDate, property]);

  const handleBookNow = async () => {
    if (!userId) {
      toast.info("Please login first");
      navigate("/login");
      return;
    }
    if (totalDays <= 0) {
      toast.info("Please choose valid dates.");
      return;
    }

    try {
      const availabilityResponse = await userInstance.post(
        "/user/check-availablity",
        {
          propertyId: _id,
          checkInDate: checkInDate.toISOString().split("T")[0],
          checkOutDate: checkOutDate.toISOString().split("T")[0],
        }
      );

      if (availabilityResponse.data.status === "unavailable") {
        toast.info(availabilityResponse.data.message);
        return;
      }

      if (userId) {
        navigate(`/confirmbooking/${_id}`, {
          state: {
            property,
            guestNumber,
            checkInDate: checkInDate.toISOString().split("T")[0],
            checkOutDate: checkOutDate.toISOString().split("T")[0],
          },
        });
      } else {
        toast.error("Login to book property");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error checking date availability");
      console.error("Error checking date availability:", error);
    }
  };

  const incrementGuestNumber = () => {
    if (guestNumber < maxGuest) {
      setGuestNumber(guestNumber + 1);
    }
  };

  const decrementGuestNumber = () => {
    if (guestNumber > 1) {
      setGuestNumber(guestNumber - 1);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const minCheckOutDate = new Date(checkInDate);
  minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);

  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        {loading ? (
          <Card style={{ margin: "10px", width: "100%" }}>
            <Skeleton height={400} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Skeleton height={30} width="80%" />
                  <Skeleton height={20} width="50%" />
                  <Skeleton height={20} width="50%" />
                  <Skeleton height={100} />
                  <Skeleton height={20} width="60%" />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton height={60} />
                  <Skeleton height={60} />
                  <Skeleton height={80} />
                  <Skeleton height={30} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          property && (
            <Card style={{ margin: "10px", width: "100%" }}>
              <Carousel>
                {property.images.slice(0, 5).map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    height="400"
                    image={image}
                    alt={`Slide ${index}`}
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      // backgroundColor: "wheat",
                    }}
                  />
                ))}
              </Carousel>
              <hr />
              <CardContent
                style={{ backgroundColor: "white", textSizeAdjust: 100 }}
              >
                <Grid container spacing={2} style={{ padding: "2%" }}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h5" fontSize="2rem">
                      <strong>{property.title}</strong>
                    </Typography>
                    <Typography variant="subtitle1" fontSize="1.2rem">
                      ₹{property.price} /- per night
                    </Typography>
                    <Typography variant="body3" fontSize="1.2rem">
                      {property.category}
                    </Typography>
                    <Typography variant="body3" fontSize="1.2rem">
                      Bathrooms : {property.bathroom}
                    </Typography>
                    <br />
                    <Typography variant="body3" fontSize="1.2rem">
                      Bedrooms : {property.bedroom}
                    </Typography>
                    <Typography variant="body2" fontSize="1rem">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {property.location}
                    </Typography>

                    <Typography variant="body1">
                      {property.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        height: "100%",
                        boxShadow: "0 2px 20px 2px rgba(0, 0, 0, 0.2)",
                        padding: "10px",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography variant="h6">
                        <strong>Book Now</strong>
                      </Typography>
                      <div
                        style={{
                          width: "100%",
                          border: "solid black 1px",
                          padding: "0 10px 0 10px",
                        }}
                      >
                        <TextField
                          label="Check-in Date"
                          type="date"
                          value={checkInDate.toISOString().split("T")[0]}
                          onChange={(e) =>
                            setCheckInDate(new Date(e.target.value))
                          }
                          fullWidth
                          margin="normal"
                          inputProps={{
                            min: today,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "100%",
                          border: "solid black 1px",
                          padding: "0 10px 0 10px",
                        }}
                      >
                        <TextField
                          label="Check-out Date"
                          type="date"
                          value={checkOutDate.toISOString().split("T")[0]}
                          onChange={(e) =>
                            setCheckOutDate(new Date(e.target.value))
                          }
                          fullWidth
                          margin="normal"
                          inputProps={{
                            min: minCheckOutDate.toISOString().split("T")[0],
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          border: "1px solid black",
                          width: "100%",
                          paddingBottom: "10px",
                        }}
                      >
                        <p style={{ textAlign: "center" }}>No. of guest:</p>
                        <StyledInputRoot>
                          <StyledButton onClick={decrementGuestNumber}>
                            <RemoveIcon fontSize="small" />
                          </StyledButton>
                          <StyledInput
                            type="text"
                            value={guestNumber}
                            readOnly
                          />
                          <StyledButton
                            onClick={incrementGuestNumber}
                            className="increment"
                          >
                            <AddIcon fontSize="small" />
                          </StyledButton>
                        </StyledInputRoot>
                      </div>
                      <Typography variant="subtitle1">
                        Total Days: {totalDays}
                      </Typography>
                      <Typography variant="subtitle1">
                        Discount: ₹{discountAmount.toFixed(2)}
                      </Typography>
                      <Typography variant="subtitle1">
                        <strong>Total Price: ₹{totalPrice.toFixed(2)}</strong>
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBookNow}
                        fullWidth
                        style={{ borderRadius: "0px 0px 15px 15px " }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )
        )}
      </Container>
    </>
  );
}

export default ViewProduct;
