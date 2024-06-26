import Header from "../navbar/Navbar";
import styles from "./About.module.css";

function About() {
  return (
    <div>
      <Header />
      <div className={styles.Main}>
        <div className={styles.aboutMain}>
          <h1 style={{ fontSize: "70%" }}>Who We Are</h1>
        </div>
      </div>
    </div>
  );
}

export default About;
