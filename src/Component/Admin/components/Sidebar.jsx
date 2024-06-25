import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
// import "./sidebar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("admintoken");
  };
  return (
    <div className="sidebar_main" style={{ height: "100vh" }}>
      <CDBSidebar className="sidebar">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Admin Dashboard
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink to="/Admin/Home">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink>
              <CDBSidebarMenuItem icon="th">Orders</CDBSidebarMenuItem>
            </NavLink> */}
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
            {/* <NavLink to="">
              <CDBSidebarMenuItem icon="credit-card" iconType="solid">
                Payment
              </CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink onClick={handleLogout} to="/">
              <CDBSidebarMenuItem icon="sign-out" iconType="solid">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
