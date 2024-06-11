import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Properties() {
  const navigate = useNavigate();
  const [porperties, setProperties] = useState([]);
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
        {porperties.map((items) => (
          <Card key={items.id} style={{ margin: 20, width: "18rem" }}>
            <Card.Img variant="top" src={items.images[0]} />
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
