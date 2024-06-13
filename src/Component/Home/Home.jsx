import Searchbar from "./../../shared/searchbar/Searchbar.jsx";
import "./../Home/Home.css";
import { FaTags } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import { Covers } from "../../assets/StaysDetails.js";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar.jsx";
import Footer from "../Admin/components/Footer.jsx";

function Home() {
  return (
    <>
      <Header />
      <div className="homeMain lg">
        <div className="contentWrapper">
          <Searchbar />
          <section>
            <div className="findBoxMain d-flex justify-content-between">
              <div className="primary">
                {" "}
                <h3>
                  Find and book your <br />
                  perfect stay
                </h3>
              </div>
              <div className="rightMain d-flex flex-row justify-content-end">
                <div className="secondary d-flex " style={{ right: "5px" }}>
                  <div>
                    <FaTags size={70} />
                  </div>
                  Save more with groups
                </div>
                <div className="secondary d-flex">
                  <div>
                    <MdOutlineChangeCircle size={80} />
                  </div>
                  Free cancellation options if plan changes
                </div>
              </div>
            </div>
          </section>

          <section className="section_item">
            <div className="Card_items">
              {Covers.map((item) => (
                <Card key={item.id} className="Cards">
                  <div className="imageContainer">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{
                        height: "auto",
                        width: "100%",
                        maxWidth: "100%",
                        objectFit: "fil",
                      }}
                    />
                    <div className="overlay">
                      <Card.Body>
                        <Card.Title>{item.category}</Card.Title>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
        <Footer/>
    </>
  );
}

export default Home;
