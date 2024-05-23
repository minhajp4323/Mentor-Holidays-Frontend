import { Button } from "react-bootstrap";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

function AdminLogin() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const sub = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3333/api/admin/login",
        login
      );
      const { data } = response.data;
      console.log(data, "Login");
      localStorage.setItem("admintoken", data);
      navigate("/Admin/Home");
      toast.success("This is a success message!", {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Login failed", error.response.data);
    }
  };
  return (
    <>
      <Header />
      <div className="login-container">
        <form onSubmit={sub} className="login-form">
          <div className="login-content">
            <h3 className="login-title">Admin Login</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control mt-1"
                placeholder="Enter Username"
                value={login.username}
                onChange={handleChange}
                required
                // defaultValue="admin"
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="inputs form-control mt-1"
                placeholder="Enter Password"
                value={login.password}
                onChange={handleChange}
                required
                // defaultValue={}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <Button type="submit" className="btn">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
