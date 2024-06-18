import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../navbar/Navbar";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
      <div
        className="homeMain d-flex justify-content-space-between"
        style={{
          width: "100%",
          padding: "50px 100px 50px 100px",
          borderRadius: 50,
        }}
      >
        {loading ? (
          <Card style={{ margin: 10, width: "70%" }}>
            <Skeleton height={400} />
            <Card.Body className="d-flex" >
              <div style={{ width: "60%" , paddingRight:"10px"}}>
                <Skeleton height={30} width="80%" />
                <Skeleton height={20} width="50%" />
                <Skeleton height={20} width="50%" />
                <Skeleton height={100} />
                <Skeleton height={20} width="60%" />
              </div>
              <div
                className="guest"
                style={{
                  width: "40%",
                  padding: "0 20px ",
                  borderLeft: "1px solid #ddd",
                }}
              >
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={80} />
                <Skeleton height={30} />
                <Skeleton height={40} />
                <Skeleton height={40} />
              </div>
            </Card.Body>
          </Card>
        ) : (
          property && (
            <Card style={{ margin: 10, width: "70%" }}>
              <Carousel style={{ height: "400px" }}>
                {property.images.slice(0, 5).map((image, index) => (
                  <Carousel.Item key={index} style={{ height: "400px" }}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`Slide ${index}`}
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <Card.Body className="d-flex">
                <div style={{ width: "60%",  paddingRight:10}}>
                  <Card.Title>{property.title}</Card.Title>
                  <Card.Text>₹{property.price}/- per night</Card.Text>
                  <Card.Text>{property.category}</Card.Text>
                  <Card.Text>{property.description}</Card.Text>
                  <Card.Text>
                    <i className="fas fa-map-marker-alt" /> {property.location}
                  </Card.Text>
                </div>
                <div
                  className="guest"
                  style={{
                    width: "40%",
                    padding: "0 20px",
                    borderLeft: "1px solid #ddd",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "solid black 1px",
                      borderRadius: 5,
                    }}
                  >
                    <label htmlFor="guestNumber">Guests:</label>
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-primary"
                        onClick={decreaseGuest}
                        style={{ marginRight: "10px" }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="guestNumber"
                        value={guestNumber}
                        onChange={(e) =>
                          setGuestNumber(parseInt(e.target.value, 10))
                        }
                        min="1"
                        style={{
                          width: "50px",
                          textAlign: "center",
                        }}
                      />

                      <button
                        className="btn btn-outline-primary"
                        onClick={increaseGuest}
                        style={{ marginLeft: "10px" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "solid black 1px",
                      borderRadius: 5,
                    }}
                  >
                    <label htmlFor="checkInDate">Check-in Date:</label>
                    <input
                      type="date"
                      id="checkInDate"
                      value={checkInDate.toISOString().split("T")[0]}
                      min={new Date().toISOString().split("T")[0]}
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
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "solid black 1px",
                      borderRadius: 5,
                    }}
                  >
                    <label htmlFor="checkOutDate">Check-out Date:</label>
                    <input
                      type="date"
                      id="checkOutDate"
                      value={checkOutDate.toISOString().split("T")[0]}
                      min={checkInDate.toISOString().split("T")[0]}
                      onChange={(e) =>
                        setCheckOutDate(new Date(e.target.value))
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "solid black 1px",
                      borderRadius: 5,
                    }}
                  >
                    <label>Total Days:</label>
                    <input
                      type="text"
                      value={totalDays}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "solid black 1px",
                      borderRadius: 5,
                    }}
                  >
                    <label>Total Price:</label>
                    <input
                      type="text"
                      value={`₹${totalPrice.toFixed(2)}`}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                      You saved ₹{discountAmount.toFixed(2)} with the 5%
                      discount!
                    </div>
                  )}
                  <Button
                    variant="primary"
                    onClick={handleBookNow}
                    style={{ width: "100%" }}
                  >
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )
        )}
      </div>
    </>
  );
}

export default ViewProduct;
