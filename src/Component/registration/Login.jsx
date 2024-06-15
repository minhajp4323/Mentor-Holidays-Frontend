import { useState } from "react";
import Header from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSucces = (token, userDetails) => {
    const { _id, username, email, phonenumber } = userDetails;
    localStorage.setItem("token", token);
    localStorage.setItem("userid", _id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("phonenumber", phonenumber);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

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

      handleLoginSucces(token, data);
    } catch (error) {
      console.log("Error while logging in", error);

      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error during login, please try again");
      }
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-content">
            <h3 className="login-title">Login</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                name="username"
                type="text"
                className="form-control mt-1"
                placeholder="Enter Username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="inputs form-control mt-1"
                placeholder="Enter Password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="forgot text-right mt-2">
              Not a member? <a onClick={() => navigate("/signin")}>Register</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
