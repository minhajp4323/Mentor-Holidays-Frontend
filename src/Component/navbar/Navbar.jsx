import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MentorMain from "./../../assets/Menort Main Logo.png";
import styles from "./navbar.module.css";
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
    localStorage.removeItem("token");
    localStorage.removeItem("wishlist");
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbarMain}>
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} href="#home">
          <img src={MentorMain} style={{ width: "90px" }} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle
          style={{ backgroundColor: "grey" }}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")} className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/properties")}
              className={styles.navLink}
            >
              Book Now
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link
              onClick={() => navigate("/about")}
              className={styles.navLink}
            >
              About
            </Nav.Link>
            {/* <Nav.Link href="#deets" className={styles.navLink}>
              Services
            </Nav.Link> */}
            <Nav.Link
              href="#contact"
              onClick={() => navigate("/contact")}
              className={styles.navLink}
            >
              Contact
            </Nav.Link>
          </Nav>

          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown
              onDoubleClick={() => navigate("/Admin/Login")}
              title={
                username ? (
                  <b>{username}</b>
                ) : (
                  <b onClick={() => navigate("/login")}>Login</b>
                )
              }
              id="NavbarScrollingDropdown"
            >
              {username && (
                <>
                  <NavDropdown.Item
                    onClick={() => navigate("/profile")}
                    className={styles.dropdownItem}
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate("/wishlist")}
                    className={styles.dropdownItem}
                  >
                    Wishlist
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate("/trip")}
                    className={styles.dropdownItem}
                  >
                    Trip
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate("/booking")}
                    className={styles.dropdownItem}
                  >
                    Booking
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={handleLogout}
                    className={styles.dropdownItem}
                  >
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
