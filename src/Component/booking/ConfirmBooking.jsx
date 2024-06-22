import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Header from "../navbar/Navbar";
import axios from "axios";

function ConfirmBooking() {
  const location = useLocation();
  const { property, guestNumber, checkInDate, checkOutDate } = location.state;
  const navigate = useNavigate();
  const razorPayKey = import.meta.env.VITE_RAZOR_PAY_KEY_ID;

  // Calculate the number of nights
  const getNumberOfNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDifference = checkOutDate - checkInDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
  };

  const totalNights = getNumberOfNights(checkInDate, checkOutDate);
  const totalPrice = totalNights * property.price;

  const handlePayment = async () => {
    const userId = localStorage.getItem("userid");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const phonenumber = localStorage.getItem("phonenumber");
    const receipt = `${Date.now()}`;

    const response = await axios.post(
      "http://localhost:3333/api/user/payment",
      {
        amount: totalPrice * 100,
        currency: "INR",
        receipt,
        propertyId: property._id,
        checkInDate,
        checkOutDate,
        guestNumber,
        userId
      }
    );

    const { data } = response.data;
    const options = {
      key: razorPayKey,
      amount: data.amount,
      currency: data.currency,
      name: "Mentor Holidays",
      description: "Test Transaction",
      image: property.images[0],
      order_id: data.id,
      handler: () => {
        alert("Payment successful");
        navigate("/");
      },
      prefill: {
        name: username,
        email: email,
        contact: phonenumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#007bff",
      },
    };

    const RzPay = new window.Razorpay(options);
    RzPay.open();
  };

  return (
    <>
      <Header />
      <div
        className="confirmationPage d-flex justify-content-center align-items-center"
        style={{
          width: "100%",
          padding: "50px 100px",
          borderRadius: 50,
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {property && (
          <Card style={{ width: "70%", borderRadius: 10 }}>
            <Card.Header
              as="h5"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              Booking Confirmation
            </Card.Header>
            <Card.Body style={{ padding: 20 }}>
              <div className="d-flex">
                <div style={{ width: "60%" }}>
                  <Card.Title>{property.title}</Card.Title>
                  <Card.Text>₹{property.price}/- per night</Card.Text>
                  <Card.Text>{property.category}</Card.Text>
                  <Card.Text>
                    <i className="fas fa-map-marker-alt" /> {property.location}
                  </Card.Text>
                </div>
                <div
                  style={{
                    width: "40%",
                    padding: "0 20px",
                    borderLeft: "1px solid #ddd",
                  }}
                >
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      style={{ border: "none", padding: "10px 0" }}
                    >
                      <strong>Guests:</strong> {guestNumber}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ border: "none", padding: "10px 0" }}
                    >
                      <strong>Check-in Date:</strong> {checkInDate}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ border: "none", padding: "10px 0" }}
                    >
                      <strong>Check-out Date:</strong> {checkOutDate}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ border: "none", padding: "10px 0" }}
                    >
                      <strong>Total Nights: </strong> {totalNights}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ border: "none", padding: "10px 0" }}
                    >
                      <strong>Total Price: </strong> ₹{totalPrice}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <div
                  style={{
                    width: "40%",
                    padding: "0 20px",
                    borderLeft: "1px solid #ddd",
                  }}
                >
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      style={{ border: "none", padding: "10px 0" }}
                    >
                      <p>
                        <strong>Guest Name:</strong>{" "}
                        {localStorage.getItem("username")}
                      </p>
                      <p>
                        <strong>Email: </strong>
                        {localStorage.getItem("email")}
                      </p>
                      <p>
                        <strong>Phone: </strong>
                        {localStorage.getItem("phonenumber")}
                      </p>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="primary"
                  onClick={handlePayment}
                  style={{
                    width: "100%",
                    backgroundColor: "#007bff",
                    borderColor: "#007bff",
                  }}
                >
                  Proceed to pay
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}

export default ConfirmBooking;
