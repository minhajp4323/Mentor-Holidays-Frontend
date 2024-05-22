import Home from "./Component/Home/Home.jsx";
import "../src/App.css";
import { Route, Routes } from "react-router-dom";
import Properties from "./Component/properties/Properties.jsx";
import AdminLogin from "./Component/Admin/AdminLogin.jsx";
import AdminHome from "./Component/Admin/AdminHome.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/Admin/Login" element={<AdminLogin />} />
          <Route path="/Admin/Home" element={<AdminHome />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
