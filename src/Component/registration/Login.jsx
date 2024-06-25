import { useState } from "react";
import Header from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token, userDetails) => {
    const { _id, username, email, phonenumber } = userDetails;
    localStorage.setItem("token", token);
    localStorage.setItem("userid", _id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("phonenumber", phonenumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:3333/api/user/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("helloo", response.data);

      navigate("/");
      toast.success("Successfully logged in");

      const { token, data } = response.data;

      handleLoginSuccess(token, data);
    } catch (error) {
      console.log("Error while logging in", error);

      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error during login, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box
        className="login-container"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form
          onSubmit={handleSubmit}
          className="login-form"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <Box className="login-content" sx={{ p: 3 }}>
            <Typography
              variant="h5"
              component="h3"
              className="login-title"
              sx={{ mb: 3 }}
            >
              Login
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
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              value={formData.password}
              sx={{ mb: 2 }}
            />
            {errorMessage && (
              <Typography color="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <ClipLoader size={20} color={"#fff"} /> : "Login"}
            </Button>
            <Typography
              className="forgot text-right mt-2"
              sx={{ textAlign: "right" }}
            >
              Not a member?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/signin")}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default Login;
