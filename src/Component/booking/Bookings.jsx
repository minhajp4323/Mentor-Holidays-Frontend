import { useEffect, useState } from "react";
import Header from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
import userInstance from "../../Interceptors/UserInterceptors";

function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await userInstance.get(`/user/booking/${userId}`);
        setBookings(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MDBContainer fluid>
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>My Bookings</h1>
        <MDBRow className="justify-content-center mb-3">
          {bookings.map((booking) => (
            <MDBCol md="12" xl="10" key={booking._id}>
              <MDBCard className="shadow-0 border rounded-3 mb-3">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                      <MDBRipple
                        rippleColor="light"
                        rippleTag="div"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <MDBCardImage
                          src={booking.property.images[0]}
                          fluid
                          className="w-100"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                    </MDBCol>
                    <MDBCol md="6">
                      <h5>{booking.property.title}</h5>
                      <div className="mt-1 mb-0 text-muted small">
                        <span>₹{booking.amount}/-</span>
                        <span className="text-primary"> • </span>
                        <span>Guests: {booking.numberOfGuests}</span>
                        <span className="text-primary"> • </span>
                        <span>Location: {booking.property.location}</span>
                      </div>
                      <div className="text small ">
                        <p>
                          Check-in date:{" "}
                          {moment(booking.checkInDate).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </p>
                        <p>
                          Check-out date:{" "}
                          {moment(booking.checkOutDate).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </p>
                        <p>
                          Booking time:{" "}
                          {moment(booking.createdAt).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </p>
                      </div>
                    </MDBCol>
                    <MDBCol
                      md="6"
                      lg="3"
                      className="border-sm-start-none border-start"
                    >
                      <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">₹{booking.amount}</h4>
                      </div>
                      <h6 className="text-danger">Non refundable</h6>
                      <div className="d-flex flex-column mt-4">
                        <MDBBtn
                          color="primary"
                          size="sm"
                          onClick={() =>
                            navigate(`/viewproperty/${booking.property._id}`)
                          }
                        >
                          View details
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Bookings;
