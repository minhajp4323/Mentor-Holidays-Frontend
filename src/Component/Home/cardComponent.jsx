import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Marquee from "react-fast-marquee";
import userInstance from "../../Interceptors/UserInterceptors";

const CardComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/user/properties");
        setProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 14000);
    return () => clearInterval(intervalId);
  }, []);
  

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleCardClick = (category) => {
    navigate("/properties", { state: { selectedCategory: category } });
  };

  const uniqueCategories = [
    ...new Set(properties.map((property) => property.category)),
  ].slice(0, 4);

  return (
    <>
      <>
        <div className="flex justify-center my-5">
          {loading ? (
            <div className="grid gap-6 max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex-1 max-w-xs mb-5">
                  <div className="bg-gray-800 rounded-lg overflow-hidden relative h-72">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      animation="wave"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <Skeleton
                        variant="text"
                        width="80%"
                        height={40}
                        animation="wave"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Marquee gradient={false} pauseOnHover speed={50}>
              <div className="flex gap-6 max-w-7xl">
                {uniqueCategories.map((category) => {
                  const property = properties.find(
                    (property) => property.category === category
                  );
                  return (
                    <div
                      key={property._id}
                      className="flex-1 max-w-xs mb-5 cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(property._id)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleCardClick(property.category)}
                    >
                      <div
                        className={`bg-gray-800 rounded-lg overflow-hidden relative h-72 transition-shadow duration-200 ${
                          hoveredCard === property._id
                            ? "shadow-xl"
                            : "shadow-md"
                        }`}
                      >
                        <img
                          src={property.images[0]}
                          alt={property.category}
                          className={`w-full h-full object-cover transition-opacity duration-300 ${
                            hoveredCard === property._id
                              ? "opacity-90"
                              : "opacity-100"
                          }`}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black via-transparent">
                          <h5 className="text-lg font-semibold">
                            {property.category}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Marquee>
          )}
        </div>
      </>
      <>
        <div></div>
      </>
    </>
  );
};

export default CardComponent;
