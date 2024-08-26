import { useEffect, useState } from "react";
import Searchbar from "./../../shared/searchbar/Searchbar.jsx";
// import "./../Home/Home.css";
import { FaTags } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import Footer from "../Admin/components/Footer.jsx";
import CardComponent from "./cardComponent.jsx";
import Testimonial from "./Testimonials/Testimonials.jsx";
import styles from "./Home.module.css";
import Logo from "../../assets/Mentor Main Logo White.PNG";
import ContactForm from "../Home/contact/ContactForm.jsx";
import Card2 from "./Card2.jsx";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div id="Home">
      {/* <Header /> */}

          {/* <div className={styles.container}>
            <div className={styles.sidebar}>
              <div className={styles.left}>
                <strong>
                  <h1 className={styles.letsgo}>LET`S TRAVEL</h1>
                </strong>
                <div className={styles.logo}>
                  <img src={Logo} alt="" />
                </div>
              </div>
            </div>
            <div className={styles.mainContent}>
              <div className={styles.overlay}>
                <div className={styles.address}>
                  <p>Kondotty, Malappuram</p>
                </div>
              </div>
            </div>
          </div> */}
      <div className={styles.homeMain}>
        <div className={styles.contentWrapper}>
          <Searchbar />

          <section>
            <div className="flex flex-col md:flex-row justify-between mt-7 w-full p-3 bg-[#3f7acf] text-white text-lg rounded-lg shadow-md">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-xl font-semibold">
                  Find and book your <br />
                  perfect stay
                </h3>
              </div>
              <div className="flex flex-col md:flex-row justify-end w-full md:w-1/2 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center w-full md:w-1/2 bg-[#164282] p-2 rounded-lg">
                  <FaTags size={40} className="mr-2" />
                  <span>Save more with groups</span>
                </div>
                <div className="flex items-center w-full md:w-1/2 bg-[#164282] p-2 rounded-lg">
                  <MdOutlineChangeCircle size={80} className="mr-2" />
                  <span>Free cancellation options if plan changes</span>
                </div>
              </div>
            </div>
          </section>

          <>
            {" "}
            <CardComponent />{" "}
          </>
          {/* <Card2/> */}
          <>
          </>
        </div>
      </div>

      <Testimonial />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
