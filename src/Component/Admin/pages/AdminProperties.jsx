import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import SideBar from "../components/Sidebar";

function AdminProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/api/admin/properties"
      );
      setProperties(response.data.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`http://localhost:3333/api/admin/properties/${id}`);
        setProperties(properties.filter((property) => property._id !== id));
        
      } catch (error) {
        console.error("Error deleting property", error);
      }
    }
  };

  return (
    <div className="d-flex w-full">
      <SideBar />
      <div className="container mt-5" style={{ padding: 50 }}>
        <h1>All Properties</h1>
        <div className="row">
          {properties.map((property) => (
            <div className="col-md-4 mb-4" key={property._id}>
              <Card style={{ position: "relative" }}>
                <Card.Img
                  variant="top"
                  src={property.images[0]}
                  alt=""
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Title>{property.title}</Card.Title>
                  <Card.Text>₹{property.price}/-</Card.Text>
                  <Card.Text>{property.category}</Card.Text>
                  <Card.Text>
                    <i className="fas fa-map-marker-alt" /> {property.location}
                  </Card.Text>
                </Card.Body>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#007bff",
                  }}
                  onClick={() =>
                    navigate(`/Admin/EditProperty/${property._id}`)
                  }
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "red",
                  }}
                  onClick={() => handleDelete(property._id)}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProperties;
