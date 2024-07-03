import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../../../assets/Property Photos/LoginWall.jpeg.jpg";
import img2 from "../../../assets/homeCatergoryDtl/Houseboat Cover.jpg";
import img3 from "../../../assets/homeCatergoryDtl/resort Cover.jpg";
import styles from "./About.module.css";
import Header from "../../navbar/Navbar";
import Footer from "../../Admin/components/Footer";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
    <Header />
    <div className={styles["about-container"]}>
      <div className={styles.aboutMain}>
        <h3 className={styles.aboutHead}>Who we are??</h3>
        <h1 className={styles.aboutSub}>World Best Travel Group</h1>
        <p className={styles.aboutPara}>
          Mentor Holidays is a premier travel company dedicated to crafting
          unforgettable journeys and experiences for groups and colleges. We
          specialize in offering a diverse range of travel services, including
          meticulously planned tour packages, luxurious resort bookings, and
          convenient train ticket reservations. Our mission is to provide
          seamless and enriching travel experiences, ensuring every trip is
          memorable and hassle-free.
        </p>
        {/* <button className={styles["about-but"]}>Discover More</button> */}
      </div>
      <div className={styles.image1}>
        <img
          src={img1}
          alt="About Image 1"
          className={styles.img1}
          data-aos="fade-up"
        />
        <img
          src={img2}
          alt="About Image 2"
          className={styles.img2}
          data-aos="fade-up"
          data-aos-delay="350"
        />
        <img
          src={img3}
          alt="About Image 3"
          className={styles.img3}
          data-aos="fade-up"
          data-aos-delay="700"
        />
      </div>
    </div>
    <Footer/>
    </>

  );
}

export default About;
