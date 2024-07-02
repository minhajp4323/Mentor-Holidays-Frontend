// import  { useEffect } from "react";
// import AOS from "aos";
import "aos/dist/aos.css";
// import img1 from "https://i.pinimg.com/564x/df/32/3e/df323e78345cdf65ff866f479dce4b14.jpg";  
// import img2 from "../../../assets/Property Photos/Abaad Munnar 1.avif";
// import img3 from "../../../assets/Property Photos/Abaad Munnar 1.avif";

// import 

function About() {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

  return (
    <div className="about-container">
      <div className="about-main">
        <h3 className="about-head">ABOUT ExploreEpic</h3>
        <h1 className="about-sub">World Best Travel Group</h1>
        <p className="about-para">
          Explore Epic is your ultimate travel companion, guiding you to
          discover hidden gems and iconic landmarks worldwide. Our expertly
          curated itineraries ensure you embark on unforgettable adventures
          and create lasting memories. At Explore Epic, we take you beyond
          the ordinary, bringing you closer to the heart of every
          destination. We handle every detail of your journey, allowing you
          to unwind and relax, ensuring a seamless and enjoyable travel
          experience.
        </p>
        <button className="about-but">Discover More</button>
      </div>
      <div className="image1">
        <img src={img1} alt="About Image 1" className="img1" data-aos="fade-up" />
        {/* <img src={img2} alt="About Image 2" className="img2" data-aos="fade-up" data-aos-delay="350" /> */}
        {/* <img src={img3} alt="About Image 3" className="img3" data-aos="fade-up" data-aos-delay="700" /> */}
      </div>
    </div>
  );
}

export default About;