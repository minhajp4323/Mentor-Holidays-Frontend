import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Wishlist() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const userId = localStorage.getItem("userid")

  useEffect(() => {
    const fetchWishlistProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/api/user/${userId}/wishlist`);
        setProperties(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist properties:", error);
      }
    };

    fetchWishlistProperties();
  }, []);

  return (
    <>
      <Header />
      <h1>Wishlist</h1>
      <hr />
      <div className="homeMain">
        {properties.map((property) => (
          <Card key={property._id} style={{ margin: 20, width: "18rem", position: "relative" }}>
            <i
              className="fas fa-heart"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "red",
                cursor: "pointer",
                fontSize: "1.5rem"
              }}
              onClick={() => console.log("Wishlist clicked for", property._id)}
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
        ))}
      </div>
    </>
  );
}

export default Wishlist;
