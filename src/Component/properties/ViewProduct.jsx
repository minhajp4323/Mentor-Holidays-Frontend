import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/api/user/properties/${_id}`
        );
        setProperty(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [_id]);

  useEffect(() => {
    // Calculate the total number of days between check-in and check-out
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(diffDays);

    // Calculate the total price with a 5% discount if the total days are more than 3
    if (property) {
      const basePrice = diffDays * property.price;
      const discount = diffDays > 3 ? 0.05 * basePrice : 0;
      setTotalPrice(basePrice - discount);
      setDiscountAmount(discount);
    }
  }, [checkInDate, checkOutDate, property]);

  const handleBookNow = () => {
    navigate(`/confirmbooking/${_id}`, {
      state: {
        property,
        guestNumber,
        checkInDate: checkInDate.toISOString().split("T")[0],
        checkOutDate: checkOutDate.toISOString().split("T")[0]
      }
    });
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
        {property && (
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
              <div style={{ width: "60%" }}>
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
                  width: "42%",
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
                  <input
                    type="number"
                    id="guestNumber"
                    value={guestNumber}
                    onChange={(e) => setGuestNumber(parseInt(e.target.value))}
                    min="1"
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
                  <label htmlFor="checkInDate">Check-in Date:</label>
                  <input
                    type="date"
                    id="checkInDate"
                    value={checkInDate.toISOString().split("T")[0]}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      const newCheckInDate = new Date(e.target.value);
                      setCheckInDate(newCheckInDate);
                      // Ensure check-out date is not before check-in date
                      if (newCheckInDate >= checkOutDate) {
                        const newCheckOutDate = new Date(newCheckInDate);
                        newCheckOutDate.setDate(newCheckOutDate.getDate() + 1); // set check-out date to be at least one day after check-in date
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
                    onChange={(e) => setCheckOutDate(new Date(e.target.value))}
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
                    You saved ₹{discountAmount.toFixed(2)} with the 5% discount!
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
        )}
      </div>
    </>
  );
}

export default ViewProduct;
