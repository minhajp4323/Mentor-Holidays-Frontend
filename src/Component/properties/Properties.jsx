import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import { fullProperties } from "./propertyList";

function Properties() {
  return (
    <>
      <Header />
      <h1>All Properties</h1>
      <div className="homeMain">
        {fullProperties.map((items) => (
          <Card key={items.id} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={items.images}
            />
            <Card.Body>
              <Card.Title>{items.title}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the cards content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Properties;
