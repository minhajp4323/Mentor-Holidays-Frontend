import { useState } from "react";
import Header from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme
} from "@mui/material";
import userInstance from "../../Interceptors/UserInterceptors";

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
      const response = await userInstance.post(
        "/user/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, data } = response.data;
      handleLoginSuccess(token, data);
      navigate("/");
      toast.success("Successfully logged in");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message); // Show error toast
      } else {
        setErrorMessage("Error during login, please try again");
        toast.error("Error during login, please try again"); // Show error toast
      }
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Header />
      <Container
        sx={{
          height: isSmallScreen ? '100vh' : '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: "5%",
          // width: "60%"
        }}
      >
        <Card
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            backgroundImage: isSmallScreen ? 'url(https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?cs=srgb&dl=pexels-donaldtong94-189296.jpg&fm=jpg)' : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&::before': isSmallScreen ? {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(255, 300, 255, 0.4)',
              backdropFilter: 'blur(5px)',
              zIndex: 1,
            } : {},
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                order: isSmallScreen ? 1 : 1,
                zIndex: 2,
                padding: isSmallScreen ? '16px' : '0',
                // width:"60%"
              }}
            >
              <CardContent>
                <form onSubmit={handleSubmit}>
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    {/* <Button component="a" href="#" variant="text">Forgot password?</Button> */}
                    <Box></Box>
                  </Box>
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
                </form>
                <Typography sx={{ textAlign: 'center' }}>
                  Not a member?{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/signin")}
                  >
                    Register
                  </Link>
                </Typography>
              </CardContent>
            </Grid>
            {!isSmallScreen && (
              <Grid item xs={12} md={4} sx={{ height: '100%' }}>
                <img src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?cs=srgb&dl=pexels-donaldtong94-189296.jpg&fm=jpg" alt="login bg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
    </>
  );
}

export default Login;
