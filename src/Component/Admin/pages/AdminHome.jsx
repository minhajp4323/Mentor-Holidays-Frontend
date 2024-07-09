import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import adminInstance from "../../../Interceptors/AdminInterceptor.jsx";
import Chart from "./RevenueGraph/Chart.jsx";

function AdminHome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [booking, setBooking] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  console.log(booking);

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }

    const fetchUsers = async () => {
      try {
        const response = await adminInstance.get("/admin/user");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users", error);
        setError(error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await adminInstance.get("/admin/bookings");
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
        const response = await adminInstance.get("/admin/total-revenue");
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
  }, [navigate]);

  if (loading) {
    return (
      <>
        <div className="d-flex">
          <Sidebar />
          <div className="container mt-5" style={{ width: "80%" }}>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-4 mb-2">
                <Card className="bg-secondary">
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
              <div className="col-12 col-sm-6 col-lg-4 mb-2">
                <Card className="bg-secondary">
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
              <div className="col-12 col-sm-6 col-lg-4 mb-2">
                <Card className="bg-secondary">
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
        </div>
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
        <div className="container mt-5" style={{ width: "80%" }}>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4 mb-2">
              <Card className="bg-secondary">
                <Card.Header>USERS</Card.Header>
                <Card.Body onClick={() => navigate("/Admin/AllUser")}>
                  <Card.Text>
                    <h1>{users.length}</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-2">
              <Card className="bg-secondary">
                <Card.Header>ORDERS</Card.Header>
                <Card.Body onClick={() => navigate("/Admin/AllBookings")}>
                  <Card.Text>
                    <h1>{booking}</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-2">
              <Card className="bg-secondary">
                <Card.Header>Total Revenue</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h1>₹{totalRevenue.toLocaleString()}</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
