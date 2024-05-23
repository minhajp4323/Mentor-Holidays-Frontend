import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar_main" style={{ height: "100vh" }}>
      <CDBSidebar className="sidebar">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Contrast
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink>
              <CDBSidebarMenuItem icon="th">Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink>
              <CDBSidebarMenuItem icon="list">
                Booking Details
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink>
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink>
              <CDBSidebarMenuItem icon="edit">
                Edit Properties
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Admin/AddProduct">
              <CDBSidebarMenuItem icon="plus">
                Add Properties
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/">
              <CDBSidebarMenuItem icon="credit-card" iconType="solid">
                Payment
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
