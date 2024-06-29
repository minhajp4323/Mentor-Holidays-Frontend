import styles from "./ContactForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Logo from "../../../assets/Mentor Long Logo.png";
import Header from "../../navbar/Navbar";

const CssTextField = styled(TextField)({
  "& label.Mui-outlined": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  input: {
    color: "white",
  },
});

const ContactForm = () => {
  return (
    <>
    <Header/>
      <div className={styles.container} id="contact">
        <span className={styles.bigCircle}></span>
        <div className={styles.form}>
          <div className={styles.contactInfo}>
            <img src={Logo} className={styles.square} alt="mentor logo" />
            <h3 className={styles.title}>We’re Ready, Let’s Talk.</h3>
            <p className={styles.text}>
              Mentor Holidays ensures that every aspect of the tour is
              meticulously planned and executed. The experienced team provides
              excellent customer service, addressing all queries and ensuring
              the students’ comfort and safety throughout the trip.
            </p>

            <div className={styles.info}>
              <div className={styles.information}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <p>Karuvankallu, Kondotty, Malappuram</p>
              </div>
              <div className={styles.information}>
                <FontAwesomeIcon icon={faEnvelope} /> &nbsp;&nbsp;
                <p>mentorholidays@gmail.com</p>
              </div>
              <div className={styles.information}>
                <FontAwesomeIcon icon={faPhone} />
                &nbsp;&nbsp;
                <p>+919072107041, +919061350111</p>
              </div>
            </div>

            <div className={styles.socialMedia}>
              <p>Connect with us :</p>
              <div className={styles.socialIcons}>
                <a href="https://www.facebook.com/profile.php?id=100063877939367">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <a href="https://www.instagram.com/mentorholidays/">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            <span className={`${styles.circle} ${styles.one}`}></span>
            <span className={`${styles.circle} ${styles.two}`}></span>

            <form action="MainForm" autoComplete="off">
              <h3 className={styles.title1}>Contact us</h3>
              <div className={styles.inputContainer}>
                <CssTextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white" } }}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <CssTextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white" } }}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <CssTextField
                  label="Phone"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white" } }}
                  required
                />
              </div>
              <div className={`${styles.inputContainer} ${styles.textarea}`}>
                <CssTextField
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white" } }}
                  required
                />
              </div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#fff",
                  color: "#3f7acf",
                  width: "100%",
                }}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
