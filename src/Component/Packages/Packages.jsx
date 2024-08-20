import { useEffect, useState } from "react";
import userInstance from "../../Interceptors/UserInterceptors";
import { useNavigate } from "react-router-dom";

function Packages() {
  const [packages, setPackage] = useState([]);
  
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [expandedDescription, setExpandedDescription] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/user/package");
        setPackage(response.data.data);
        console.log(response);
        
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let interval;
    if (hoveredPackage !== null) {
      interval = setInterval(() => {
        setActiveImageIndex((prevIndex) => {
          const newIndex = { ...prevIndex };
          const currentPackageImages = packages[hoveredPackage].images;
          newIndex[hoveredPackage] =
            (newIndex[hoveredPackage] + 1) % currentPackageImages.length;
          return newIndex;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [hoveredPackage, packages]);

  const handleMouseEnter = (index) => {
    setHoveredPackage(index);
    setActiveImageIndex((prevIndex) => ({
      ...prevIndex,
      [index]: 0,
    }));
  };

  const handleMouseLeave = () => {
    setHoveredPackage(null);
  };

  const toggleDescription = (index) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="flex justify-center w-full">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {packages.map((packageItem, index) => (
            <div
              key={packageItem._id}
              className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-56 mx-4 -mt-6 overflow-hidden rounded-xl shadow-lg">
                <img
                  src={packageItem.images[activeImageIndex[index] || 0]}
                  alt={packageItem.destination}
                  className="object-cover w-full h-full transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-semibold leading-snug text-blue-gray-900">
                  {packageItem.destination} - {packageItem.duration} day
                </h5>
                <p
                  className={`text-base font-light leading-relaxed text-gray-700 ${
                    expandedDescription[index] ? "" : "line-clamp-3"
                  }`}
                >
                  {packageItem.description}
                </p>
                {packageItem.description.split(" ").length > 20 && (
                  <button
                    onClick={() => toggleDescription(index)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    {expandedDescription[index] ? "Read Less" : "..."}
                  </button>
                )}
              </div>
              <div className="p-6 pt-0">
                <button
                  className="px-6 py-3 text-xs font-bold text-center text-white uppercase transition-all bg-gray-900 rounded-lg shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
                  type="button"
                  onClick={() => navigate(`/packages/${packageItem._id}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Packages;
