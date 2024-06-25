import { useState } from "react";
import Header from "../navbar/Navbar";
import "./Signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Box, TextField, Button, Typography, Link, Grid } from "@mui/material";

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
  const [loading, setLoading] = useState(false); // Loading state

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

    setLoading(true); // Start loading
    if (!otpSent) {
      try {
        const response = await axios.post(
          "http://localhost:3333/api/user/register",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data);
        setEmail(formData.email);
        setOtpSent(true);
        setErrorMessage("");
        toast.success("OTP sent successfully");
      } catch (error) {
        console.error("Error during registration", error);

        if (error.response) {
          setErrorMessage(
            error.response.data?.error ||
              "An error occurred during registration"
          );
        } else if (error.request) {
          setErrorMessage("No response from server. Please try again later.");
        } else {
          setErrorMessage("Error during registration. Please try again.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      handleOtpSubmit();
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:3333/api/user/verifyotp",
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      navigate("/login");
      toast.success("User successfully registered");
    } catch (error) {
      console.error("Error during OTP verification", error);
      toast.error("Error during OTP verification");

      if (error.response) {
        console.log(error.response.data.error);
        setErrorMessage(
          error.response.data?.error ||
            "An error occurred during OTP verification"
        );
      } else if (error.request) {
        setErrorMessage("No response from server. Please try again later.");
      } else {
        setErrorMessage("Error during OTP verification. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Header />
      <Box className="signin-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} className="signin-form" style={{ width: '100%', maxWidth: '600px' }}>
          <Box className="signin-content" sx={{ p: 3 }}>
            <Typography variant="h5" component="h3" className="signin-title" sx={{ mb: 3 }}>
              Sign In
            </Typography>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              value={formData.username}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              value={formData.email}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone Number"
              name="phonenumber"
              type="tel"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              value={formData.phonenumber}
              sx={{ mb: 2 }}
            />
            {!otpSent && (
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Re-enter Password"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  />
                </Grid>
              </Grid>
            )}
            {otpSent && (
              <TextField
                label="OTP"
                name="otp"
                type="text"
                variant="outlined"
                fullWidth
                required
                onChange={handleOtpChange}
                sx={{ mb: 2 }}
              />
            )}
            {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <ClipLoader size={20} color={"#fff"} /> : otpSent ? "Verify OTP" : "Submit"}
            </Button>
            <Typography className="forgot text-right mt-2" sx={{ textAlign: 'right' }}>
              Already have an account?{" "}
              <Link component="button" variant="body2" onClick={() => navigate("/login")}>
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default SignIn;
