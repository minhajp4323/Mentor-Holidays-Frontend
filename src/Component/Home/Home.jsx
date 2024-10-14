import { useEffect, useState } from "react";
import Searchbar from "./../../shared/searchbar/Searchbar.jsx";
import { FaTags } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import Footer from "../Admin/components/Footer.jsx";
import CardComponent from "./cardComponent.jsx";
import Testimonial from "./Testimonials/Testimonials.jsx";
import styles from "./Home.module.css";
import ContactForm from "../Home/contact/ContactForm.jsx";
import Logo from "../../assets/Menort Main Logo.png";

// Loading screen component
function LoadingScreen() {
  return (
    <div className={`${styles.loadingScreen} flex items-center justify-center h-screen`}>
      <img src={Logo} alt="Welcome Logo" className="w-80" />
    </div>
  );
}

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadedIn, setIsFadedIn] = useState(false); // New state for fade-in

  useEffect(() => {
    // Simulate a 2-second loading time
    setTimeout(() => {
      setIsLoading(false);
      // Apply fade-in effect after loading
      setTimeout(() => {
        setIsFadedIn(true); // Set the fade-in effect after the component is loaded
      }, 100); // Small delay to start fade-in
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />; // Show loading screen while loading
  }

  return (
    <div id="Home" className={isFadedIn ? styles.homePageFadeIn : ""}> {/* Apply the fade-in class */}
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

          <CardComponent />
        </div>
      </div>

      <Testimonial />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
