import Header from "../navbar/Navbar";
import styles from "./About.module.css";

function About() {
  return (
    <div className="about">
      <Header />
      <div className={styles.Main}>
        <div className={styles.aboutMain}>
          <h1 style={{ fontSize: "70%" }}>Who We Are</h1>
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.one}>
          <div></div>
          <h2 >Our Missions </h2>
          <p>
            Inspire and empower travelers to explore the world with ease,
            creating unforgettable experiences that last a lifetim
          </p>
        </div>
        <div className={styles.one}>
          <img
            src="https://mentorholidays.com/wp-content/uploads/2024/06/pexels-photo-346885-346885-1024x682.jpg"
            alt="mission image"
            style={{ width: "30%", borderRadius: 10 }}
          />
        </div>
        
      </div>
    </div>
  );
}

export default About;
