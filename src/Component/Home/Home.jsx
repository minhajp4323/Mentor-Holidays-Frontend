import Searchbar from "./../../shared/searchbar/Searchbar.jsx";
import "./../Home/Home.css";
import { FaTags } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import { Covers } from "./stay/stayDetails.js";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  return (
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
        {/* <section>
          <div>
            <h3 className="sub_text">Discover your new favourite stay</h3>
            <div className="services">
              {Covers.map((item) => (
                <div className="items" key={item.category}>
                  <div className="image_container">
                    <img
                      style={{ height: "300px", width: "95%" }}
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="category_container">
                    <h5>{item.category}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <section className="section_item">
          <div className="Card_items">
            {Covers.map((item) => (
              <Card key={item.category} className="Cards">
                <div className="imageContainer">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{
                      height: "auto",
                      width: "100%",
                      maxWidth: "100%",
                      objectFit: "cover",
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
  );
}

export default Home;
