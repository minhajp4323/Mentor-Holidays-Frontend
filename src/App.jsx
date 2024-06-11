import Home from "./Component/Home/Home.jsx";
import "../src/App.css";
import { Route, Routes } from "react-router-dom";
import Properties from "./Component/properties/Properties.jsx";
import AdminLogin from "./Component/Admin/pages/AdminLogin.jsx";
import AdminHome from "./Component/Admin/pages/AdminHome.jsx";
import AddProduct from "./Component/Admin/pages/AddProduct.jsx";
import Registration from "./Component/registration/Signin.jsx";
import Login from "./Component/registration/Login.jsx";
import ViewProduct from "./Component/properties/ViewProduct.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/signin" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewproperty/:_id" element={<ViewProduct />} />

          <Route path="/Admin/Login" element={<AdminLogin />} />
          <Route path="/Admin/Home" element={<AdminHome />} />
          <Route path="/Admin/AddProduct" element={<AddProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
