import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "../../components/Sidebar.jsx";
import { Form } from "react-bootstrap";
import adminInstance from "../../../../Interceptors/AdminInterceptor.jsx";
import { useNavigate } from "react-router-dom";

function PropertyRevenue() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("weekly");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }

    const fetchProperties = async () => {
      try {
        const response = await adminInstance.get("/admin/property-revenue");
        setProperties(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching properties and revenue", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  const filterPropertiesByTimeframe = (properties) => {
    const now = new Date();
    let filteredProperties = properties;

    switch (timeframe) {
      case "weekly":
        filteredProperties = properties.filter((property) =>
          property.bookings.some((booking) => {
            const checkInDate = new Date(booking.checkInDate);
            return now - checkInDate <= 7 * 24 * 60 * 60 * 1000;
          })
        );
        break;
      case "monthly":
        filteredProperties = properties.filter((property) =>
          property.bookings.some((booking) => {
            const checkInDate = new Date(booking.checkInDate);
            return now - checkInDate <= 30 * 24 * 60 * 60 * 1000;
          })
        );
        break;
      case "yearly":
        filteredProperties = properties.filter((property) =>
          property.bookings.some((booking) => {
            const checkInDate = new Date(booking.checkInDate);
            return now - checkInDate <= 365 * 24 * 60 * 60 * 1000;
          })
        );
        break;
      default:
        break;
    }

    return filteredProperties;
  };

  const filteredProperties = filterPropertiesByTimeframe(properties);

  if (loading) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="d-flex flex-wrap mt-5 w-100">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Revenue</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
                
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton width={80} />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="d-flex flex-wrap mt-2 w-100"
        style={{ margin: "3%", marginBottom: 0 }}
      >
        <Form.Group controlId="timeframeSelect" className="mb-3">
          <Form.Label>Filter by Timeframe</Form.Label>
          <Form.Control
            as="select"
            value={timeframe}
            onChange={handleTimeframeChange}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Form.Control>
        </Form.Group>
        <Table striped bordered hover>
          <thead>
            <tr style={{ fontSize: "1.2rem" }}>
              <th>Name</th>
              <th>Total Revenue</th>
              {/* <th>Check-in Date</th>
              <th>Check-out Date</th> */}
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <React.Fragment key={property._id}>
                <tr>
                  <td rowSpan={property.bookings.length + 1}>
                    {property.name}
                  </td>
                  <td rowSpan={property.bookings.length + 1}>
                    {" "}
                    <strong>
                      ₹ {property.totalRevenue.toLocaleString()}
                    </strong>{" "}
                  </td>
                </tr>
                {property.bookings.map((booking) => (
                  <tr key={booking._id}>
                    {/* <td>
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </td> */}
                    <td>
                      {new Date(booking.paymentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default PropertyRevenue;
