import { Button, Form } from "react-bootstrap";

function Searchbar() {
  return (
    <>
      <Form className="contentWrapper xl" >
        <Form.Group className="mb-3 d-flex justify-content-between">
          <Form.Control
            type="text"
            placeholder="Search places, hotel, and more"
            style={{ width: "300px" }} // Adjust the width as needed
          />
          <Form.Control
            type="date"
            placeholder="search here"
            style={{ width: "300px" }} // Adjust the width as needed
          />
          <Form.Control
            type="text"
            placeholder="search here"
            style={{ width: "300px" }} // Adjust the width as needed
          />
          <Button>Search..</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default Searchbar;
