import Footer from "../../../shared/footer/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Card from "react-bootstrap/Card";

function AdminHome() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="d-flex mt-5 w-80">
          <div>
            <Card style={{ width: "18rem" }} className="mb-2 m-2 bg-secondary">
              <Card.Header>USERS</Card.Header>
              <Card.Body>
                <Card.Title> USERS </Card.Title>
                <Card.Text>{/* <h1>  {userData.length} </h1> */}</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div>
            <Card style={{ width: "18rem" }} className="mb-2  m-2 bg-secondary">
              <Card.Header> ORDERS</Card.Header>
              <Card.Body>
                <Card.Title> ORDERS </Card.Title>
                <Card.Text>
                  {/* <h1>     {vieworder.length} </h1>  */}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div>
            <Card style={{ width: "18rem" }} className="mb-2  m-2 bg-secondary">
              <Card.Header> Delivered</Card.Header>
              <Card.Body>
                <Card.Title> Delivery </Card.Title>
                <Card.Text>{/* <h1>  {userData.length+5} </h1>   */}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminHome;
