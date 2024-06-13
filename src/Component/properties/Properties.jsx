import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Properties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3333/api/user/properties"
      );
      setProperties(response.data.data);
      console.log(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h1>All Properties</h1>
      <div className="homeMain">
        {properties.map((items) => (
          <Card key={items._id} style={{ margin: 20, width: "18rem", position: "relative" }}>
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
              onClick={() => console.log("Favorite clicked for", items._id)}
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
