import { useState, useEffect } from "react";
import Searchbar from "./../../shared/searchbar/Searchbar.jsx";
// import "./../Home/Home.css";
import { FaTags } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import Header from "../navbar/Navbar.jsx";
import Footer from "../Admin/components/Footer.jsx";
// import CardComponent from "./cardComponent.jsx";
import Testimonial from "./Testimonials/Testimonials.jsx";
import styles from "./Home.module.css";
import Logo from "../../assets/Mentor Main Logo White.PNG";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div id="Home">
      <Header />

      <div className={styles.homeMain}>
        <div className={styles.contentWrapper}>
          {/* <Searchbar /> */}
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <strong>
                <h1 className={styles.letsgo}>LET`S TRAVEL</h1>
              </strong>
              <div className={styles.logo}>
                <img src={Logo} alt="" />
              </div>
            </div>
            <div className={styles.mainContent}>
              <div className={styles.overlay}>
                <div className={styles.address}>
                  <p>Near Calicut International Airport</p>
                  <p>Kondotty, Malappuram, Kerala-673638</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.find}>
            <section>
              <div className={styles.findBoxMain}>
                <div className="primary">
                  <h3>
                    Find and book your <br />
                    perfect stay
                  </h3>
                </div>
                <div className={styles.rightMain}>
                  <div className={styles.secondary} style={{ right: "5px" }}>
                    <FaTags size={40} />
                    <span>Save more with groups</span>
                  </div>
                  <div className={styles.secondary}>
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
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>{/* <CardComponent /> */}</>
        )}
      </div>
      <Testimonial />
      <Footer />
    </div>
  );
}

export default Home;
