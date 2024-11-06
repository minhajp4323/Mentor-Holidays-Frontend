import { useEffect, useState } from "react";
import userInstance from "../../Interceptors/UserInterceptors";
import { useNavigate } from "react-router-dom";
import { FaSearchLocation } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton"; 

function Packages() {
  const [packages, setPackage] = useState([]);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [expandedDescription, setExpandedDescription] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/user/package");
        setPackage(response.data.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching packages", error);
      } finally {
        setLoading(false); 
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
          const currentPackageImages = packages[hoveredPackage]?.images || [];
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

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center w-full">
      <div className="container px-6 py-12 mx-auto">
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by destination or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl"
              >
                <Skeleton variant="rectangular" height={224} className="rounded-xl" />
                <div className="p-6">
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="100%" height={60} />
                </div>
                <div className="p-6 pt-0">
                  <Skeleton variant="text" width="30%" height={40} />
                </div>
              </div>
            ))
          ) : (
            filteredPackages.map((packageItem, index) => (
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
                  <p className="text-sm text-sky-900">{packageItem.category}</p>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Packages;
