import React, { useEffect, useState } from "react";
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
        console.log(response.data.data);
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
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 bg-gray-50">
          <div className="bg-white shadow-sm rounded-lg p-4">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Total Revenue</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Check-in Date</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Check-out Date</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">
                      <Skeleton width={80} />
                    </td>
                    <td className="py-2 px-4">
                      <Skeleton />
                    </td>
                    <td className="py-2 px-4">
                      <Skeleton />
                    </td>
                    <td className="py-2 px-4">
                      <Skeleton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 text-sm">Error: {error.message}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-50">
        <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
          <Form.Group controlId="timeframeSelect">
            <Form.Label className="text-gray-700 text-sm font-medium">Filter by Timeframe</Form.Label>
            <Form.Control
              as="select"
              value={timeframe}
              onChange={handleTimeframeChange}
              className="form-select mt-1 block w-full text-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-4">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Total Revenue</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <React.Fragment key={property._id}>
                  <tr>
                    <td rowSpan={property.bookings.length + 1} className="py-2 px-4 text-sm text-gray-800 font-medium">
                      {property.name}
                    </td>
                    <td rowSpan={property.bookings.length + 1} className="py-2 px-4 text-sm text-gray-800 font-medium">
                      <strong>₹ {property.totalRevenue.toLocaleString()}</strong>
                    </td>
                  </tr>
                  {property.bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {new Date(booking.paymentDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PropertyRevenue;
