import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";

const SideBar = () => {
  return (
    <CDBSidebar className= "h-96" >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Contrast
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th">Orders</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="list">Booking Details</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="edit">Edit Properties</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="plus">Add Properties</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="credit-card" iconType="solid">
            Payment
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default SideBar;
