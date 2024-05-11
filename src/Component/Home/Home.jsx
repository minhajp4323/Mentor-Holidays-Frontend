import Searchbar from "./../../shared/searchbar/Searchbar.jsx";
import "./../Home/Home.css";

function Home() {
  return (
    <div className="homeMain lg">
      <div className="contentWrapper">
        <Searchbar />
        <div className="findBoxMain d-flex justify-content-between">
          <div className="primary">
            {" "}
            <h3>
              Find and book your <br />
              perfect stay
            </h3>
          </div>
          <div className="rightMain d-flex flex-row justify-content-end">
            {" "}
            {/* Align to the end */}
            <div className="secondary">Save more with groups</div>
            <div className="secondary">
              Free cancellation options if plan changes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
