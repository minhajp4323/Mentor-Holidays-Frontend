import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "../../components/Sidebar.jsx";

function PropertyRevenue() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/api/admin/property-revenue"
        );
        setProperties(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching properties and revenue", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="d-flex flex-wrap mt-5 w-100" style={{ margin: "3%" }}>
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
      <div className="d-flex flex-wrap mt-5 w-100" style={{ margin: "3%" }}>
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
            {properties.map((property) => (
              <React.Fragment key={property._id}>
                <tr>
                  <td rowSpan={property.bookings.length + 1}>{property.name}</td>
                  <td rowSpan={property.bookings.length + 1}>₹{property.totalRevenue.toLocaleString()}</td>
                </tr>
                {property.bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
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
