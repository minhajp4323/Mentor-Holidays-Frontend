import Home from "./Component/Home/Home.jsx";
import "../src/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Properties from "./Component/properties/Properties.jsx";
import AdminLogin from "./Component/Admin/pages/AdminLogin.jsx";
import AdminHome from "./Component/Admin/pages/AdminHome.jsx";
import AddProduct from "./Component/Admin/pages/AddProduct.jsx";
import Registration from "./Component/registration/Signin.jsx";
import Login from "./Component/registration/Login.jsx";
import ViewProduct from "./Component/properties/ViewProduct.jsx";
import EditProperty from "./Component/Admin/pages/EditProperty.jsx";
import AdminProperties from "./Component/Admin/pages/AdminProperties.jsx";
import AllUser from "./Component/Admin/pages/AllUsers.jsx";
import Wishlist from "./Component/wishlist/Wishlist.jsx";
import UserPropfile from "./Component/profile/UserPropfile.jsx";
import ConfirmBooking from "./Component/booking/ConfirmBooking.jsx";
import Bookings from "./Component/booking/Bookings.jsx";
import BookingList from "./Component/Admin/pages/BookingList.jsx";
import ContactForm from "./Component/Home/contact/ContactForm.jsx";
import PropertyRevenue from "./Component/Admin/pages/revenue/Revenue.jsx";
import About from "./Component/Home/About/About.jsx";
import Services from "./Component/Home/Services/Service.jsx";
import Team from "./Component/Home/Team/Team.jsx";
import PortFolio from "./Component/Home/PortFolio/Portfolio.jsx";
// import { useEffect } from "react";
import Header from "./Component/navbar/Navbar.jsx";
import AddPackage from "./Component/Admin/pages/Packages/AddPackage.jsx";
import AdminPackages from "./Component/Admin/pages/Packages/AllPackages.jsx";
import Packages from "./Component/Packages/Packages.jsx";
import PackageView from "./Component/Packages/PackageView.jsx";
import EditPackage from "./Component/Admin/pages/Packages/EditPackages.jsx";




function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          {/* user */}
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/signin" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/viewproperty/:_id" element={<ViewProduct />} />
          <Route path="/confirmbooking/:id" element={<ConfirmBooking />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<UserPropfile />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/service" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/portfolio" element={<PortFolio />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageView/>} />

          {/* admin */}
          <Route path="/Admin/Login" element={<AdminLogin />} />
          <Route path="/Admin/Home" element={<AdminHome />} />
          <Route path="/Admin/AddProduct" element={<AddProduct />} />
          <Route path="/Admin/EditProperty" element={<EditProperty />} />
          <Route path="/Admin/AdminProperties" element={<AdminProperties />} />
          <Route path="/Admin/EditProperty/:id" element={<EditProperty />} />
          <Route path="/Admin/AllUser" element={<AllUser />} />
          <Route path="/Admin/AllBookings" element={<BookingList />} />
          <Route path="/Admin/Revenue" element={<PropertyRevenue />} />
          <Route path="/Admin/Package" element={<AddPackage />} />
          <Route path="/Admin/AllPackage" element={<AdminPackages />} />
          <Route path="/Admin/editPackage/:id" element={<EditPackage />} />

          {/* <Route path="Chart" element={<Chart />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
