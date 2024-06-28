import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function Wishlist() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchWishlistProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/api/user/wishlist/${userId}`
        );
        setProperties(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching wishlist properties:", error);
        toast.error("Error fetching wishlist properties");
      }
    };

    fetchWishlistProperties();
  }, [userId]);

  const handleWishlistClick = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:3333/api/user/wishlist/${userId}`, {
        data: { propertyId },
      });
      const updatedProperties = properties.filter(
        (property) => property._id !== propertyId
      );
      setProperties(updatedProperties);

      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updatedWishlist = storedWishlist.filter((id) => id !== propertyId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      toast.success("Removed from Wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing from wishlist");
    }
  };

  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
        Wishlist
      </h1>
      <hr />
      <div className="homeMain">
        {properties.length === 0 ? (
          <p>No properties in wishlist.</p>
        ) : (
          properties.map((property) => (
            <Card
              key={property._id}
              style={{ margin: 20, width: "18rem", position: "relative" }}
            >
              <i
                className="fas fa-heart"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
                onClick={() => handleWishlistClick(property._id)}
              />
              <Card.Img
                variant="top"
                src={property.images[0]}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>₹{property.price}/-</Card.Text>
                <Card.Text>{property.category}</Card.Text>
                <Card.Text>
                  <i className="fas fa-map-marker-alt" /> {property.location}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/viewproperty/${property._id}`)}
                >
                  View details
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default Wishlist;
