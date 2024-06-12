import { useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Header from "./navbar/Navbar";

function ConfirmBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { property, guestNumber, checkInDate, checkOutDate } = location.state;

  const handleConfirm = () => {
    // Handle confirmation logic here
    navigate(`/booking-success`);
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
          alignItems: "center"
        }}
      >
        {property && (
          <Card style={{ width: "70%", borderRadius: 10 }}>
            <Card.Header as="h5" style={{ backgroundColor: "#007bff", color: "#fff", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              Booking Confirmation
            </Card.Header>
            <Card.Body style={{ padding: 20 }}>
              <div className="d-flex">
                <div style={{ width: "60%" }}>
                  <Card.Title>{property.title}</Card.Title>
                  <Card.Text>₹{property.price}/- per night</Card.Text>
                  <Card.Text>{property.category}</Card.Text>
                  {/* <Card.Text>{property.description}</Card.Text> */}
                  <Card.Text>
                    <i className="fas fa-map-marker-alt" /> {property.location}
                  </Card.Text>
                </div>
                <div style={{ width: "40%", padding: "0 20px", borderLeft: "1px solid #ddd" }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item style={{ border: "none", padding: "10px 0" }}>
                      <strong>Guests:</strong> {guestNumber}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ border: "none", padding: "10px 0" }}>
                      <strong>Check-in Date:</strong> {checkInDate}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ border: "none", padding: "10px 0" }}>
                      <strong>Check-out Date:</strong> {checkOutDate}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="primary"
                  onClick={handleConfirm}
                  style={{ width: "100%", backgroundColor: "#007bff", borderColor: "#007bff" }}
                >
                  Confirm Booking
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
