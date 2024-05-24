import { useState } from "react";
import Header from "../navbar/Navbar";
import "./Signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3333/api/user/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.error("Error during registration", error);
  
      if (error.response) {
        setErrorMessage(error.response.data?.error || "An error occurred during registration");
      } else if (error.request) {
        setErrorMessage("No response from server. Please try again later.");
      } else {
        setErrorMessage("Error during registration. Please try again.");
      }
    }
  };
  

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="signin-container">
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-content">
            <h3 className="signin-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                name="username"
                type="text"
                className="form-control mt-1"
                placeholder="Enter Username.."
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="form-control mt-1"
                placeholder="Enter Email.. "
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Phone Number</label>
              <input
                name="phonenumber"
                type="tel"
                className="form-control mt-1"
                placeholder="Enter Phone number"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Re-enter Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control mt-1"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <p className="forgot text-right mt-2">
                Already have an account?{" "}
                <a onClick={() => navigate("/login")}>Login here</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
