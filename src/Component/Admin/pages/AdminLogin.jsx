import { useState } from "react";
import Header from "../../navbar/Navbar";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token, userDetails) => {
    const { _id, username, email, phonenumber } = userDetails;
    localStorage.setItem("admintoken", token);
    localStorage.setItem("adminuserid", _id);
    localStorage.setItem("adminusername", username);
    localStorage.setItem("adminemail", email);
    localStorage.setItem("adminphonenumber", phonenumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3333/api/admin/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/Admin/Home");
      toast.success("Successfully logged in");
      const { token, data } = response.data;
      handleLoginSuccess(token, data);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error during login, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3333/api/admin/forgot-password",
        { email: resetPasswordEmail },
        { headers: { "Content-Type": "application/json" } }
      );
      setResetPasswordDialogOpen(false);
      toast.success("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email", error);
      toast.error("Failed to send password reset email");
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
              Admin Login
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
            <div className="d-flex justify-between">
              <Typography
                className="forgot text-right mt-2"
                sx={{ textAlign: "right" }}
              >
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setResetPasswordDialogOpen(true)}
                >
                  Forgot Password?
                </Link>
              </Typography>
              <Typography
                className="forgot text-right mt-2"
                sx={{ textAlign: "left" }}
              >
                Not a member ?
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/admin/signin")}
                >
                  Sign up
                </Link>
              </Typography>
            </div>
          </Box>
        </form>
      </Box>

      {/* Forgot Password Dialog */}
      <Dialog
        open={resetPasswordDialogOpen}
        onClose={() => setResetPasswordDialogOpen(false)}
      >
        <DialogTitle>Forgot Password?</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter your email"
            type="email"
            variant="outlined"
            fullWidth
            value={resetPasswordEmail}
            onChange={(e) => setResetPasswordEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setResetPasswordDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleForgotPassword} color="primary">
            Send Reset Email
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminLogin;
