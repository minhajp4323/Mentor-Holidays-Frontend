import { Button, Form, Col, Row } from "react-bootstrap";
import "./Searchbar.css";

function Searchbar() {
  return (
    <>
      <div style={{ padding: "30px 0px 0 0" }}>
        <h1>Where to?</h1>
      </div>
      <Form className="mainSearch contentWrapper">
        <Row>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Search places, hotel, and more"
            />
          </Col>
          <Col sm={3}>
            <Form.Control type="date" placeholder="Search here" />
          </Col>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Search here" />
          </Col>
          <Col sm={3} style={{ paddingRight: 0 }}>
            {" "}
            {/* Remove right padding for the last column */}
            <Button>Search..</Button>
          </Col>
        </Row>
      </Form>
      
    </>
  );
}

export default Searchbar;
