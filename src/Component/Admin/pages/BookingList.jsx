import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import axios from "axios";
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
      <div className="container  m-5" style={{ padding: "0px" }}>
        <h1 >All Bookings</h1>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by username or title..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "80%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <table className="table booking-table " >
          <thead>
            <tr style={{fontSize:"1rem"}}>
              <th scope="col">
                <h3>Username</h3>
              </th>
              <th scope="col">
                <h3>Email</h3>
              </th>
              <th scope="col">
                <h3>Hotel Name</h3>
              </th>
              <th scope="col">
                <h3>Booking Id</h3>
              </th>
              <th scope="col">
                <h3>CheckIn Date</h3>
              </th>
              <th scope="col">
                <h3>CheckOut Date</h3>
              </th>
              <th scope="col">
                <h3>Receipt ID</h3>
              </th>
              <th scope="col">
                <h3>Amount Paid</h3>
              </th>
              <th scope="col">
                <h3>Payment Date & Time</h3>
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
                    <td>{booking.bookingId}</td>
                    <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                    <td>{booking.receipt}</td>
                    <td>
                      {booking.amount} {booking.currency}
                    </td>
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
                      <td>{booking.bookingId}</td>
                      <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                      <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                      <td>{booking.receipt}</td>
                      <td>
                        {booking.amount} {booking.currency}
                      </td>
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
