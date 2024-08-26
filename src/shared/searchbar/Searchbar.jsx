import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("resorts"); // Default search type is "resorts"
  const navigate = useNavigate();

  const handleSearch = () => {
    const path = searchType === "resorts" ? "properties" : "packages";
    navigate(`/${path}?search=${searchTerm}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="py-6">
        <h1 className="text-2xl font-semibold">Where to?</h1>
      </div>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/4">
            <label htmlFor="search-type" className="block text-sm font-medium text-gray-700">
              Search In
            </label>
            <select
              id="search-type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="resorts">Resorts</option>
              <option value="packages">Tours</option>
            </select>
          </div>

          <div className="w-full sm:w-2/3">
            <label htmlFor="search-term" className="block text-sm font-medium text-gray-700">
              Search {searchType}, hotel, and more
            </label>
            <input
              type="text"
              id="search-term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Search ${searchType}, hotel, and more`}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="w-full sm:w-1/4 flex items-end">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
