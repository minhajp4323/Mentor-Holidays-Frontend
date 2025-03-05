import { useEffect, useState } from "react";
import userInstance from "../../Interceptors/UserInterceptors";

const PackageHome = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/user/package");
        // Limit to a maximum of 4 packages
        setPackages(response.data.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading....</div>;
  }

  const cardContainerClass =
    packages.length < 4 ? "h-[calc(100vh-4rem)]" : "h-auto";

  return (
    <div className={`${cardContainerClass} `}>
      <h2 className="text-4xl font-extrabold text-center mb-[60px] text-gray-800">
        Top Packages
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-8 lg:px-16">
        {packages.slice(0, 4).map((packageItem) => (
          <div
            key={packageItem.id}
            className="flex flex-col h-auto bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:scale-105"
          >
            <img
              className="object-cover w-full h-48 rounded-t-lg md:h-40"
              src={packageItem.images[0]}
              alt={packageItem.destination}
            />
            <div className="flex flex-col justify-between p-6 leading-normal flex-grow">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
                {packageItem.destination}
              </h2>
              <p className="mb-3 font-medium text-gray-700 dark:text-gray-400 line-clamp-2">
                {packageItem.category}
              </p>
              <button className="mt-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageHome;
