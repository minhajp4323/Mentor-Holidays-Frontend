import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import "./BookingList.css"; // Import the CSS file

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3333/api/admin/bookings");
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      }
    };
    fetchBookings();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBookings = bookings.filter((user) => {
    const userCheck = user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const bookingCheck = user.bookings.some((booking) =>
      booking.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return userCheck || bookingCheck;
  });

  return (
    <div className="d-flex w-full">
      <SideBar />
      <div className="container mt-3 " >
        <h1 >All Bookings</h1>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by username or title..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>
        <table className="table booking-table">
          <thead>
            <tr >
              <th scope="col">
                <h5>Username</h5>
              </th>
              <th scope="col">
                <h5>Email</h5>
              </th>
              <th scope="col">
                <h5>Hotel Name</h5>
              </th>
              <th scope="col">
                <h5>CheckIn Date</h5>
              </th>
              <th scope="col">
                <h5>CheckOut Date</h5>
              </th>
              <th scope="col">
                <h5>Receipt ID</h5>
              </th>
              <th scope="col">
                <h5>Amount Paid</h5>
              </th>
              <th scope="col">
                <h5>Payment Date & Time</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((user) => {
              if (user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                return user.bookings.map((booking, bookingIndex) => (
                  <tr key={booking.bookingId} className={bookingIndex % 2 === 0 ? "even" : "odd"}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{booking.title}</td>
                    <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                    <td>{booking.receipt}</td>
                    <td>{booking.amount} {booking.currency}</td>
                    <td>
                      {new Date(booking.paymentDate).toLocaleDateString()}
                      {booking.paymentTime ? ` ${booking.paymentTime}` : ""}
                    </td>
                  </tr>
                ));
              } else {
                return user.bookings
                  .filter((booking) =>
                    booking.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((booking, bookingIndex) => (
                    <tr key={booking.bookingId} className={bookingIndex % 2 === 0 ? "even" : "odd"}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{booking.title}</td>
                      <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                      <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                      <td>{booking.receipt}</td>
                      <td>{booking.amount} {booking.currency}</td>
                      <td>
                        {new Date(booking.paymentDate).toLocaleDateString()}
                        {booking.paymentTime ? ` ${booking.paymentTime}` : ""}
                      </td>
                    </tr>
                  ));
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingList;
