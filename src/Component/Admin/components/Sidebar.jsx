import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // Import the CSS file
import Logo from "../../../assets/Mentor Long Logo White.png";
import SmallLogo from "../../../assets/Mentor Simple White.png"; // Import your new logo

const SideBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("admintoken");
  };

  return (
    <div className="sidebar_main sticky-sidebar">
      <CDBSidebar className="sidebar">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Admin Dashboard
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink to="/Admin/Home">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/AllBookings">
              <CDBSidebarMenuItem icon="list">Booking Details</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/AllUser">
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/AdminProperties">
              <CDBSidebarMenuItem icon="building">Properties</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/AllPackage">
              <CDBSidebarMenuItem icon="box">Packages</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/Revenue">
              <CDBSidebarMenuItem icon="dollar" iconType="solid">Revenue</CDBSidebarMenuItem>
            </NavLink>
            <NavLink onClick={handleLogout} to="/">
              <CDBSidebarMenuItem icon="sign-out" iconType="solid">Logout</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter>
          <div className="logo-container">
            <img className="default-logo" src={Logo} alt="Logo" />
            <img className="small-logo" src={SmallLogo} alt="Small Logo" />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
