import { Form } from "react-bootstrap";

function Searchbar() {
  return (
    <>
      <Form className="">
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="search here"
            style={{ width: "200px" }} // Adjust the width as needed
          />
          <Form.Control
            type="text"
            placeholder="search here"
            style={{ width: "200px" }} // Adjust the width as needed
          />
          <Form.Control
            type="text"
            placeholder="search here"
            style={{ width: "200px" }} // Adjust the width as needed
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default Searchbar;
