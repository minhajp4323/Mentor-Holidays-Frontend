import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import adminInstance from "../../../Interceptors/AdminInterceptor";
import { useNavigate } from "react-router-dom";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await adminInstance.get("/admin/bookings");
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      }
    };
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }
    fetchBookings();
  }, [navigate]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBookings = bookings.filter((user) => {
    const userCheck = user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const bookingCheck = user.bookings.some((booking) =>
      booking.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return userCheck || bookingCheck;
  });

  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
        <Grid container spacing={2} className="mb-6">
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by username or title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="text-base border border-gray-300 rounded-lg"
            />
          </Grid>
        </Grid>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 text-left text-sm font-semibold">Username</th>
                <th className="p-2 text-left text-sm font-semibold">Email</th>
                <th className="p-2 text-left text-sm font-semibold">Hotel Name</th>
                <th className="p-2 text-left text-sm font-semibold">CheckIn Date</th>
                <th className="p-2 text-left text-sm font-semibold">CheckOut Date</th>
                <th className="p-2 text-left text-sm font-semibold">Receipt ID</th>
                <th className="p-2 text-left text-sm font-semibold">Amount Paid</th>
                <th className="p-2 text-left text-sm font-semibold">Payment Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((user) => {
                if (user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return user.bookings.map((booking, bookingIndex) => (
                    <tr
                      key={booking.bookingId}
                      className={bookingIndex % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                    >
                      <td className="p-2 text-sm text-gray-700">{user.username}</td>
                      <td className="p-2 text-sm text-gray-700">{user.email}</td>
                      <td className="p-2 text-sm text-gray-700">{booking.title}</td>
                      <td className="p-2 text-sm text-gray-700">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </td>
                      <td className="p-2 text-sm text-gray-700">
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </td>
                      <td className="p-2 text-sm text-gray-700">{booking.receipt}</td>
                      <td className="p-2 text-sm text-gray-700">
                        {booking.amount} {booking.currency}
                      </td>
                      <td className="p-2 text-sm text-gray-700">
                        {new Date(booking.paymentDate).toLocaleDateString()}
                        {booking.paymentTime ? ` ${booking.paymentTime}` : ""}
                      </td>
                    </tr>
                  ));
                } else {
                  return user.bookings
                    .filter((booking) =>
                      booking.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((booking, bookingIndex) => (
                      <tr
                        key={booking.bookingId}
                        className={bookingIndex % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                      >
                        <td className="p-2 text-sm text-gray-700">{user.username}</td>
                        <td className="p-2 text-sm text-gray-700">{user.email}</td>
                        <td className="p-2 text-sm text-gray-700">{booking.title}</td>
                        <td className="p-2 text-sm text-gray-700">
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </td>
                        <td className="p-2 text-sm text-gray-700">
                          {new Date(booking.checkOutDate).toLocaleDateString()}
                        </td>
                        <td className="p-2 text-sm text-gray-700">{booking.receipt}</td>
                        <td className="p-2 text-sm text-gray-700">
                          {booking.amount} {booking.currency}
                        </td>
                        <td className="p-2 text-sm text-gray-700">
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
    </div>
  );
}

export default BookingList;
