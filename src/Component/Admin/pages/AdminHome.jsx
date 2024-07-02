import { useNavigate } from "react-router-dom";
import Footer from "../../../shared/footer/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AdminHome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [booking, setBooking] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  console.log(booking);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/api/admin/user"
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users", error);
        setError(error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/api/admin/bookings"
        );
        setBooking(response.data.dataCount);
        console.log(response.data.dataCount);
      } catch (error) {
        console.error("Error fetching bookings", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/api/admin/total-revenue"
        );
        const total = response.data.data[0]?.total || 0;
        setTotalRevenue(total);
        console.log(total);
      } catch (error) {
        console.error("Error fetching total revenue", error);
        setError(error);
      }
    };

    fetchUsers();
    fetchBookings();
    fetchTotalRevenue();
  }, []);

  if (loading) {
    return (
      <>
        <div className="d-flex">
          <Sidebar />
          <div className="d-flex mt-5 w-80">
            <div>
              <Card
                style={{ width: "18rem" }}
                className="mb-2 m-2 bg-secondary"
              >
                <Card.Header>
                  <Skeleton width={80} />
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h1>
                      <Skeleton />
                    </h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div>
              <Card
                style={{ width: "18rem" }}
                className="mb-2 m-2 bg-secondary"
              >
                <Card.Header>
                  <Skeleton width={80} />
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h1>
                      <Skeleton />
                    </h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div>
              <Card
                style={{ width: "18rem" }}
                className="mb-2 m-2 bg-secondary"
              >
                <Card.Header>
                  <Skeleton width={80} />
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h1>
                      <Skeleton />
                    </h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="d-flex mt-5 w-80">
          <div>
            <Card style={{ width: "18rem" }} className="mb-2 m-2 bg-secondary">
              <Card.Header>USERS</Card.Header>
              <Card.Body onClick={() => navigate("/Admin/AllUser")}>
                <Card.Text>
                  <h1>{users.length}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div>
            <Card style={{ width: "18rem" }} className="mb-2 m-2 bg-secondary">
              <Card.Header>ORDERS</Card.Header>
              <Card.Body onClick={() => navigate("/Admin/AllBookings")}>
                <Card.Text>
                  <h1>{booking}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div>
            <Card style={{ width: "18rem" }} className="mb-2 m-2 bg-secondary">
              <Card.Header>Total Revenue</Card.Header>
              <Card.Body>
                <Card.Text>
                  <h1>₹{totalRevenue.toLocaleString()}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminHome;
