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
              <CDBSidebarMenuItem icon="list">
                Booking Details
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/AllUser">
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/AdminProperties">
              <CDBSidebarMenuItem icon="building">
                Properties
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/AddProduct">
              <CDBSidebarMenuItem icon="plus">
                Add Properties
              </CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink to="/Admin/AllPackage">
              <CDBSidebarMenuItem icon="box">
                Packages
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/Revenue">
              <CDBSidebarMenuItem icon="dollar" iconType="solid">
                Revenue
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink onClick={handleLogout} to="/">
              <CDBSidebarMenuItem icon="sign-out" iconType="solid">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter>
          <div style={{display:"flex", justifyContent:"center", paddingBottom:"10%"}}>
            <img src={Logo} alt="" style={{ width: "70%" }} />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
