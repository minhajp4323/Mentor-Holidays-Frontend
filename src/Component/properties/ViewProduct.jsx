import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../navbar/Navbar";

function ViewProduct() {
  const { _id } = useParams();
  console.log("id: ", _id);
  const [porperty, setProperty] = useState(null);

  useEffect(() => {
    const handleget = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/api/user/properties/${_id}`
        );

        setProperty(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleget();
  }, [_id]);

  return (
    <>
    <Header />
      <h1>All Properties</h1>
      <div className="homeMain">
        {porperty && (
          <Card key={porperty._id} style={{ width: "100vh" }}>
            <Card.Img variant="top" src={porperty.images?.[0]} alt=""  />
            <Card.Body>
              <Card.Title>{porperty.title}</Card.Title>
              <Card.Text>₹{porperty.price}/-</Card.Text>
              <Card.Text>{porperty.category}</Card.Text>
              <Card.Text>{porperty.description}g</Card.Text>

              <Card.Text>
                <i className="fas fa-map-marker-alt" /> {porperty.location}
              </Card.Text>

              <Button variant="primary">Book Now</Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}

export default ViewProduct;
