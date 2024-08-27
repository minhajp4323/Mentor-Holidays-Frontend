import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, ListGroup, Col, Row, Container } from "react-bootstrap";
import Header from "../navbar/Navbar";
import { toast } from "react-toastify";
import userInstance from "../../Interceptors/UserInterceptors";
import { useEffect } from "react";
import './ConfirmBooking.css';  

function ConfirmBooking() {
  const location = useLocation();
  const { property, guestNumber, checkInDate, checkOutDate } = location.state;
  const navigate = useNavigate();
  const razorPayKey = import.meta.env.VITE_RAZOR_PAY_KEY_ID;

  const getNumberOfNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDifference = checkOutDate - checkInDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
  };

  const totalNights = getNumberOfNights(checkInDate, checkOutDate);
  const totalPrice = totalNights * property.price;
  const title = property.title;

  const handlePayment = async () => {
    const userId = localStorage.getItem("userid");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const phonenumber = localStorage.getItem("phonenumber");
    const receipt = `RCPT_Mentor${Date.now()}`;

    try {
      const paymentResponse = await userInstance.post("/user/payment", {
        title,
        amount: totalPrice * 100,
        currency: "INR",
        receipt,
        propertyId: property._id,
        checkInDate,
        checkOutDate,
        guestNumber,
        userId,
      });

      const { data } = paymentResponse.data;
      const options = {
        key: razorPayKey,
        amount: data.amount,
        currency: data.currency,
        name: "Mentor Holidays",
        description: "Test Transaction",
        image: property.images[0],
        order_id: data.id,
        handler: async (response) => {
          try {
            const bookingResponse = await userInstance.post("/user/booking", {
              title,
              checkInDate,
              checkOutDate,
              guestNumber,
              amount: totalPrice,
              currency: "INR",
              receipt,
              propertyId: property._id,
              userId,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });

            if (bookingResponse.data.status === "success") {
              toast.success("Booking confirmed!");
              navigate("/");
            } else {
              toast.error("Booking failed. Please try again.");
            }
          } catch (error) {
            toast.error("Booking failed. Please try again.");
          }
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
    } catch (error) {
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }
  });

  return (
    <>
      <Container fluid className="confirmationPage d-flex justify-content-center align-items-center">
        {property && (
          <Card className="booking-card">
            <Card.Header className="booking-card-header">
              Booking Confirmation
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} md={6} className="mb-3">
                  <Card.Img variant="top" src={property.images[0]} className="property-image" />
                </Col>
                <Col xs={12} md={6}>
                  <Card.Title>{property.title}</Card.Title>
                  <Card.Text>₹{property.price}/- per night</Card.Text>
                  <Card.Text>{property.category}</Card.Text>
                  <Card.Text>
                    <i className="fas fa-map-marker-alt" /> {property.location}
                  </Card.Text>
                  <ListGroup variant="flush" className="mt-3">
                    <ListGroup.Item><strong>Guests:</strong> {guestNumber}</ListGroup.Item>
                    <ListGroup.Item><strong>Check-in Date:</strong> {checkInDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Check-out Date:</strong> {checkOutDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Total Nights:</strong> {totalNights}</ListGroup.Item>
                    <ListGroup.Item><strong>Total Price:</strong> ₹{totalPrice}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12}>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Guest Name:</strong> {localStorage.getItem("username")}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {localStorage.getItem("email")}</ListGroup.Item>
                    <ListGroup.Item><strong>Phone:</strong> {localStorage.getItem("phonenumber")}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12}>
                  <Button variant="primary" onClick={handlePayment} className="w-100">
                    Proceed to Pay
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}

export default ConfirmBooking;
