import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  TextField,
  Container,
  Box,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Header from "../navbar/Navbar";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/api/user/properties/${_id}`
        );
        setProperty(response.data.data);
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

  const handleBookNow = () => {
    if (totalDays <= 0) {
      toast.info("Please choose valid dates.");
      return;
    }

    navigate(`/confirmbooking/${_id}`, {
      state: {
        property,
        guestNumber,
        checkInDate: checkInDate.toISOString().split("T")[0],
        checkOutDate: checkOutDate.toISOString().split("T")[0],
      },
    });
  };

  const increaseGuest = () => {
    setGuestNumber((prevGuests) => prevGuests + 1);
  };

  const decreaseGuest = () => {
    if (guestNumber > 1) {
      setGuestNumber((prevGuests) => prevGuests - 1);
    }
  };

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
                  />
                ))}
              </Carousel>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="h5">{property.title}</Typography>
                    <Typography variant="subtitle1">
                      ₹{property.price}/- per night
                    </Typography>
                    <Typography variant="body2">{property.category}</Typography>
                    <Typography variant="body1">
                      {property.description}
                    </Typography>
                    <Typography variant="body2">
                      <i className="fas fa-map-marker-alt" /> {property.location}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        padding: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Typography variant="subtitle1">Guests:</Typography>
                      <Box display="flex" alignItems="center">
                        <Button
                          variant="outlined"
                          onClick={decreaseGuest}
                          style={{ marginRight: "10px" }}
                        >
                          -
                        </Button>
                        <TextField
                          type="number"
                          value={guestNumber}
                          onChange={(e) =>
                            setGuestNumber(parseInt(e.target.value, 10))
                          }
                          inputProps={{ min: 1 }}
                          style={{ width: "50px", textAlign: "center" }}
                        />
                        <Button
                          variant="outlined"
                          onClick={increaseGuest}
                          style={{ marginLeft: "10px" }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        padding: 2,
                        marginBottom: 2,
                      }}
                    >
                      <TextField
                        label="Check-in Date"
                        type="date"
                        value={checkInDate.toISOString().split("T")[0]}
                        onChange={(e) => {
                          const newCheckInDate = new Date(e.target.value);
                          setCheckInDate(newCheckInDate);
                          if (newCheckInDate >= checkOutDate) {
                            const newCheckOutDate = new Date(newCheckInDate);
                            newCheckOutDate.setDate(
                              newCheckOutDate.getDate() + 1
                            );
                            setCheckOutDate(newCheckOutDate);
                          }
                        }}
                        fullWidth
                      />
                    </Box>
                    <Box
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        padding: 2,
                        marginBottom: 2,
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
                      />
                    </Box>
                    <Box
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        padding: 2,
                        marginBottom: 2,
                      }}
                    >
                      <TextField
                        label="Total Days"
                        value={totalDays}
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                      />
                    </Box>
                    <Box
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        padding: 2,
                        marginBottom: 2,
                      }}
                    >
                      <TextField
                        label="Total Price"
                        value={`₹${totalPrice.toFixed(2)}`}
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                      />
                    </Box>
                    {discountAmount > 0 && (
                      <Typography
                        variant="body2"
                        color="error"
                        style={{ marginBottom: "10px" }}
                      >
                        You saved ₹{discountAmount.toFixed(2)} with the 5%
                        discount!
                      </Typography>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBookNow}
                      fullWidth
                    >
                      Book Now
                    </Button>
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
