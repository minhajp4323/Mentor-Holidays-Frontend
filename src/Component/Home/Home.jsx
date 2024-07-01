import  { useState, useEffect } from "react";
import Searchbar from "./../../shared/searchbar/Searchbar.jsx";
import "./../Home/Home.css";
import { FaTags } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import Header from "../navbar/Navbar.jsx";
import Footer from "../Admin/components/Footer.jsx";
import CardComponent from "./cardComponent.jsx";
import ContactForm from "./contact/ContactForm.jsx";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or any async operations
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after loading
    }, 2000); // Adjust timeout as needed
  }, []);

  return (
    <div id="Home">
      <Header />

      <div className="homeMain">
        <div className="contentWrapper">
          <Searchbar />
          
          <div className="find">
            <section>
              <div className="findBoxMain d-flex justify-content-between">
                <div className="primary">
                  <h3>
                    Find and book your <br />
                    perfect stay
                  </h3>
                </div>
                <div className="rightMain d-flex flex-row justify-content-end">
                  <div className="secondary d-flex" style={{ right: "5px" }}>
                    <FaTags size={40} />
                    <span>Save more with groups</span>
                  </div>
                  <div className="secondary d-flex">
                    <MdOutlineChangeCircle size={80} />
                    <span>Free cancellation options if plan changes</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {isLoading ? (
          <div className="loadingAnimation">
            {/* Loading animation or spinner */}
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <CardComponent />
            <ContactForm id="#contact" />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
