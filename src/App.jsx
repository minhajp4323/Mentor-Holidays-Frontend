import Home from "./Component/Home/Home.jsx";
import "../src/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Route, Routes } from "react-router-dom";
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
import About from "./Component/Home/About.jsx";
import Category from "./Component/properties/Category.jsx";
import ContactForm from "./Component/Home/contact/ContactForm.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          {/* user */}
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/signin" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/viewproperty/:_id" element={<ViewProduct />} />
          <Route path="/confirmbooking/:id" element={<ConfirmBooking />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<UserPropfile />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:id" element={<Category />} />
          {/* <Route path="/demoLogin" element={<DemoLogin/>}/> */}

          {/* admin */}
          <Route path="/Admin/Login" element={<AdminLogin />} />
          <Route path="/Admin/Home" element={<AdminHome />} />
          <Route path="/Admin/AddProduct" element={<AddProduct />} />
          <Route path="/Admin/EditProperty" element={<EditProperty />} />
          <Route path="/Admin/AdminProperties" element={<AdminProperties />} />
          <Route path="/Admin/EditProperty/:id" element={<EditProperty />} />
          <Route path="/Admin/AllUser" element={<AllUser />} />
          <Route path="/Admin/AllBookings" element={<BookingList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
