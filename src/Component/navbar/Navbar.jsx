import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import MentorMain from "./../../assets/Menort Main Logo.png";
import { FaBars } from "react-icons/fa";
import styles from "./navbar.module.css";
import { NavDropdown } from "react-bootstrap";

function Header() {
  const username = localStorage.getItem("username");
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith("/Admin");

  if (isAdminPath) {
    return null;
  }

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
    <Navbar
      collapseOnSelect
      expand="sm"
      style={{
        position: "sticky",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(5px)", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      className={styles.navbarMain}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img src={MentorMain} style={{ width: "120px" }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Book Now">
              <NavDropdown.Item onClick={() => navigate("/packages")}>
                Top Packages
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/properties")}>
                Tour Resorts
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => navigate("/about")}
              className={styles.navLink}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/contact")}
              className={styles.navLink}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/team")}
              className={styles.navLink}
            >
              Team
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/service")}
              className={styles.navLink}
            >
              Services
            </Nav.Link>
          </Nav>

          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown
              title={username ? <b>{username}</b> : <b>Login</b>}
              id="NavbarScrollingDropdown"
            >
              {username && (
                <>
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
              {!username && (
                <NavDropdown.Item onClick={() => navigate("/login")}>
                  Login
                </NavDropdown.Item>
              )}
              {!username && (
                <NavDropdown.Item onClick={() => navigate("/Admin/Login")}>
                  Admin
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
