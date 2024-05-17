import Home from "./Component/Home/Home.jsx";
import "../src/App.css";
import { Route, Routes } from "react-router-dom";
import Properties from "./Component/properties/Properties.jsx";

function App() {
  return (
    <>
      <div className="App">
        
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          
        </Routes>
      </div>
    </>
  );
}

export default App;
