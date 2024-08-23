import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineWhatsApp } from "react-icons/ai";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import userInstance from "../../Interceptors/UserInterceptors";
import { useParams } from "react-router-dom";

const PackageView = () => {
  const { id } = useParams();
  const [packages, setPackage] = useState({});
  const [numPersons, setNumPersons] = useState(1); // State to track the number of persons

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get(`/user/package/${id}`);
        setPackage(response.data.data);
      } catch (error) {
        console.log("Error fetching properties", error);
      }
    };
    fetchData();
  }, [id]);

  const images =
    packages.images?.map((url) => ({
      original: url,
      thumbnail: url,
    })) || [];

  const renderCustomItem = (item) => {
    return (
      <img
        src={item.original}
        alt=""
        className="w-full h-96 object-cover"
      />
    );
  };

  // Function to handle WhatsApp redirection
  const handleWhatsAppClick = () => {
    const message = `Hello, I'm interested in the package to ${packages.destination} (${packages.duration} day).
Price: ₹${packages.price}/-
Category: ${packages.category}
Description: ${packages.description}
Number of Persons: ${numPersons}`;

    const url = `https://wa.me/9846564323?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Function to increase the number of persons
  const incrementPersons = () => {
    if (numPersons < 10) {
      setNumPersons(numPersons + 1);
    }
  };

  // Function to decrease the number of persons
  const decrementPersons = () => {
    if (numPersons > 1) {
      setNumPersons(numPersons - 1);
    }
  };

  const plusMinusButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      <div className="mx-auto lg:mx-0">
        <ReactImageGallery
          items={images}
          showBullets={false}
          showFullscreenButton={true}
          showPlayButton={false}
          renderItem={renderCustomItem}  // Custom render method
        />
      </div>

      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {packages.destination} - {packages.duration} day
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={3.5}
            />
            <p className="ml-3 text-sm text-gray-400">(150 reviews)</p>
          </div>
        </div>

        <p className="font-bold">
          Category: <span className="font-normal">{packages.category}</span>
        </p>

        <p className="mt-4 text-4xl font-bold text-violet-900">
          ₹{packages.price}
          {"/- "}
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {packages.description}
        </p>

        {/* Number of Persons Counter */}
        <div className="mt-6">
          <p className="pb-2 text-sm text-gray-500">Number of Persons</p>
          <div className="flex items-center">
            <button className={plusMinusButton} onClick={decrementPersons}>
              −
            </button>
            <div className="flex h-8 w-12 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
              {numPersons}
            </div>
            <button className={plusMinusButton} onClick={incrementPersons}>
              +
            </button>
          </div>
        </div>

        <div className="mt-7 flex flex-row items-center gap-6">
          <button 
            className="flex h-12 w-12 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800 rounded-full"
            onClick={handleWhatsAppClick}
          >
            <AiOutlineWhatsApp className="mx-2" />
          </button>
          <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300 rounded-xl p-3">
            <AiOutlineHeart className="size-4" />
            Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageView;
