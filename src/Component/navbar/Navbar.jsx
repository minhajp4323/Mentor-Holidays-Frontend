import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import MentorMain from "./../../assets/Menort Main Logo.png";
import "./navbar.css";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbarMain">
      <Container>
        <Navbar.Brand href="#home" className="">
          {" "}
          <img src={MentorMain} style={{ width: "90px" }} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto   ">
            <NavDropdown
              title="Book Now"
              id="collapsible-nav-dropdown"
              className=""
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#features">List your property</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#deets">Trips</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              SignIn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
