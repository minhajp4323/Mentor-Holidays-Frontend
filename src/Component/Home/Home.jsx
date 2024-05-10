import Searchbar from "./searchbar/Searchbar";
import "./../Home/Home.css";

function Home() {
  return (
    <div  className="homeMain lg" >
      <div className="contentWrapper">
        <Searchbar />
      </div>
    </div>
  );
}

export default Home;
