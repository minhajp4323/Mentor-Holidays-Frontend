import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";

function Properties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3333/api/user/properties");
      setProperties(response.data.data);

      if (userId) {
        const wishlistResponse = await axios.get(`http://localhost:3333/api/user/${userId}/wishlist`);
        setWishlist(wishlistResponse.data.data.map(property => property._id));
      }
    };
    fetchData();
  }, [userId]);

  const handleWishlistClick = async (propertyId) => {
    if (!userId) {
      toast.error("Please log in to add to the wishlist");
      setTimeout(() => {
        
        navigate('/login')
      }, 1000);
      return;
    }

    try {
      if (wishlist.includes(propertyId)) {
        // Remove from wishlist
        await axios.delete(`http://localhost:3333/api/user/${userId}/wishlist/${propertyId}`);
        setWishlist(wishlist.filter(id => id !== propertyId));
        console.log("Wishlist Deleted for", propertyId, "for userId", userId);
        toast.error("Removed from Wishlist");
      } else {
        // Add to wishlist
        await axios.post(`http://localhost:3333/api/user/${userId}/wishlist`, { propertyId });
        setWishlist([...wishlist, propertyId]);
        console.log("Wishlist Added for", propertyId, "for userId", userId);
        toast.success("Property added to wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <>
      <Header />
      <h1>All Properties</h1>
      <div className="homeMain">
        {properties.map((items) => (
          <Card
            key={items._id}
            style={{ margin: 20, width: "18rem", position: "relative" }}
          >
            <i
              className={`fas fa-heart ${wishlist.includes(items._id) ? "wishlist-active" : ""}`}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: wishlist.includes(items._id) ? "red" : "black",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
              onClick={() => handleWishlistClick(items._id)}
            />
            <Card.Img
              variant="top"
              src={items.images[0]}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{items.title}</Card.Title>
              <Card.Text>₹{items.price}/-</Card.Text>
              <Card.Text>{items.category}</Card.Text>
              <Card.Text>
                <i className="fas fa-map-marker-alt" /> {items.location}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/viewproperty/${items._id}`)}
              >
                View details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Properties;
