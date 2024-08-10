import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./AdminLogin.css"; 
import adminInstance from "../../../Interceptors/AdminInterceptor";

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

  const handleLoginSuccess = (token) => {
    localStorage.setItem("admintoken", token);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminInstance.post("/admin/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
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

  return (
    <>
      <div className="login-container">
        <Box className="login-content">
          <form onSubmit={handleSubmit} className="login-form">
            <Typography variant="h5" component="h3" className="login-title">
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
              
            </div>
          </form>
        </Box>

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
            <Button
              // onClick={handleForgotPassword}
              color="primary"
            >
              Send Reset Email
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default AdminLogin;
