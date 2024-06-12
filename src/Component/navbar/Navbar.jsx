import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import MentorMain from "./../../assets/Menort Main Logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

function Header() {
  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("phonenumber");

    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbarMain">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} href="#home" className="">
          {" "}
          <img src={MentorMain} style={{ width: "90px" }} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto   ">
            {/* <NavDropdown
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
            </NavDropdown> */}
            <Nav.Link onClick={() => navigate("/properties")}>
              Book Now
            </Nav.Link>
          </Nav>
          
          {/* <Nav>
            <Nav.Link href="#pricing">My Bookings</Nav.Link>
            <Nav.Link href="#deets">Favorites</Nav.Link>
            <Nav.Link
              onDoubleClick={() => navigate("/Admin/Login")}
              onClick={() => navigate("/signin")}
              eventKey={2}
            >
              {username ? username : <>Signin</>}
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
           */}
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown
              onDoubleClick={() => navigate("/Admin/Login")}
              title={
                username ? (
                  <b>
                    {username} 
                  </b>
                ) : (
                  <b onClick={()=>navigate("/login")}>Login</b>
                )
              }
              id="NavbarScrollingDropdown"
            >
              
              {username && (
                <>
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/wishlist")}>
                    Wishlist
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/trip")}>
                    Trip
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/booking")}>
                    Booking
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt" /> Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
