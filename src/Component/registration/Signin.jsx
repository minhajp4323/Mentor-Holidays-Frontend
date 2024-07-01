import { useState } from "react";
import Header from "../navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import {  TextField, Button, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import styles from "./Signin.module.css";  // Assuming this is in the same folder
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

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

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    if (!otpSent) {
      try {
        const response = await axios.post(
          "http://localhost:3333/api/user/register",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response)
        setEmail(formData.email);
        setOtpSent(true);
        setErrorMessage("");
        toast.success("OTP sent successfully");
      } catch (error) {
        console.error("Error during registration", error);
        if (error.response) {
          setErrorMessage(
            error.response.data?.error || "An error occurred during registration"
          );
        } else if (error.request) {
          setErrorMessage("No response from server. Please try again later.");
        } else {
          setErrorMessage("Error during registration. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      handleOtpSubmit();
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3333/api/user/verifyotp",
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response)
      navigate("/login");
      toast.success("User successfully registered");
    } catch (error) {
      console.error("Error during OTP verification", error);
      toast.error("Error during OTP verification");
      if (error.response) {
        setErrorMessage(
          error.response.data?.error || "An error occurred during OTP verification"
        );
      } else if (error.request) {
        setErrorMessage("No response from server. Please try again later.");
      } else {
        setErrorMessage("Error during OTP verification. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.contactInfo}>
            <h3 className={styles.title}>Sign In</h3>
            <p className={styles.text}>
              Mentor Holidays ensures that every aspect of the tour is meticulously planned and executed.
            </p>
            <div className={styles.info}>
              <div className={styles.information}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <p>Karuvankallu, Kondotty, Malappuram</p>
              </div>
              <div className={styles.information}>
                <FontAwesomeIcon icon={faEnvelope} />
                <p>mentorholidays@gmail.com</p>
              </div>
              <div className={styles.information}>
                <FontAwesomeIcon icon={faPhone} />
                <p>+919072107041, +919061350111</p>
              </div>
            </div>
          </div>
          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <CssTextField
                  label="Username"
                  name="username"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
              <div className={styles.inputContainer}>
                <CssTextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className={styles.inputContainer}>
                <CssTextField
                  label="Phone Number"
                  name="phonenumber"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={formData.phonenumber}
                />
              </div>
              {!otpSent && (
                <div className={styles.inputContainer}>
                  <CssTextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              )}
              {!otpSent && (
                <div className={styles.inputContainer}>
                  <CssTextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  />
                </div>
              )}
              {otpSent && (
                <div className={styles.inputContainer}>
                  <CssTextField
                    label="OTP"
                    name="otp"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleOtpChange}
                  />
                </div>
              )}
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#fff",
                  color: "#3f7acf",
                  width: "100%",
                }}
              >
                {loading ? <ClipLoader size={20} color={"#fff"} /> : otpSent ? "Verify OTP" : "Submit"}
              </Button>
              <Typography className="forgot text-right mt-2" style={{ textAlign: "right" }}>
                Already have an account?{" "}
                <Link component="button" variant="body2" onClick={() => navigate("/login")}>
                  Login here
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
