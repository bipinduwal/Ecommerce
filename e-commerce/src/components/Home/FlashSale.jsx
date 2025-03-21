import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FlashSale = () => {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(100); // Start at 100% (full progress)

  // Countdown logic
  useEffect(() => {
    const targetTime = new Date().setHours(new Date().getHours() + 3); // Flash sale ends in 3 hours
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Calculate the percentage progress based on time left
        const totalDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
        const timePassed = totalDuration - difference;
        const percentProgress = (timePassed / totalDuration) * 100;
        setProgress(percentProgress); // Update progress based on time left

        setTimeLeft({ hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setProgress(100); // Flash sale ends, progress is full
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Determine color based on progress value
  const getProgressColor = () => {
    if (progress <= 30) {
      return "bg-green-500"; // Red for low progress (last 30%)
    } else if (progress <= 70) {
      return "bg-yellow-500"; // Yellow for moderate progress
    } else {
      return "bg-red-500"; // Green for high progress (above 70%)
    }
  };

  const handleAddToCart = () => {
    Swal.fire("Item added to cart.", "Congratulation", "success");
  };
  // Flash sale items
  const flashSaleItems = [
    {
      id: 1,
      image: "/logo2.png",
      title: "Wireless Earbuds",
      price: "Rs.29.99",
      originalPrice: "Rs.59.99",
      discountPercent: "20%",
    },
    {
      id: 2,
      image: "/logo2.png",
      title: "Smart Watch",
      price: "Rs.49.99",
      originalPrice: "Rs.99.99",
      discountPercent: "30%",
    },
    {
      id: 3,
      image: "/logo2.png",
      title: "Portable Speaker",
      price: "Rs.39.99",
      originalPrice: "Rs.79.99",
      discountPercent: "20%",
    },
    {
      id: 4,
      image: "/logo2.png",
      title: "Gaming Mouse",
      price: "Rs.19.99",
      originalPrice: "Rs.39.99",
      discountPercent: "50%",
    },
    {
      id: 6,
      image: "/logo2.png",
      title: "Gaming Mouse",
      price: "Rs.19.99",
      originalPrice: "Rs.39.99",
      discountPercent: "50%",
    },
    {
      id: 7,
      image: "/logo2.png",
      title: "Gaming Mouse",
      price: "Rs.19.99",
      originalPrice: "Rs.39.99",
      discountPercent: "50%",
    },
    {
      id: 8,
      image: "/logo2.png",
      title: "Gaming Mouse",
      price: "Rs.19.99",
      originalPrice: "Rs.39.99",
      discountPercent: "50%",
    },
  ];

  return (
    <div className="max-w-full px-10 mx-auto sm:px-6 lg:px-8 py-12 bg-gray-200">
      <div className="my-2">
        <div className="relative">
          {/* Label */}
          <div className="text-2xl font-bold text-green-500">{`Today`}</div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
            <div
              className={`${getProgressColor()} h-full rounded-full transition-all duration-300`}
              style={{ width: `${1 + progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Flash Sale 🔥
        </h2>

        {/* Countdown Timer */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <p className="text-lg font-medium text-gray-700">Ends in:</p>
          <div className="flex space-x-2 text-center">
            <div className="px-4 py-2 bg-gray-800 text-white rounded-md">
              <p className="text-lg font-bold">{timeLeft.hours}</p>
              <p className="text-sm">Hours</p>
            </div>
            <div className="px-4 py-2 bg-gray-800 text-white rounded-md">
              <p className="text-lg font-bold">{timeLeft.minutes}</p>
              <p className="text-sm">Minutes</p>
            </div>
            <div className="px-4 py-2 bg-gray-800 text-white rounded-md">
              <p className="text-lg font-bold">{timeLeft.seconds}</p>
              <p className="text-sm">Seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sale Items */}
      <div className="flex gap-6 md:gap-4 overflow-x-scroll scrollbar-hide snap-x">
        {flashSaleItems.map((item) => (
          <div
            id="flash_item"
            key={item.id}
            className="bg-white h-96 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow min-w-full 2xsm:min-w-40 sm:min-w-48 md:min-w-56 snap-center xsm:snap-start flex-initial relative group"
          >
            <span className="absolute top-2 right-2 px-4 py-1 bg-orange-600 text-white rounded-sm">
              -{item.discountPercent}
            </span>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-1/2 object-cover "
            />
            <div className="p-4 pt-10">
              <h3 className="font-semibold text-lg text-gray-800">
                {item.title}
              </h3>
              <p className="text-red-500 font-bold">{item.price}</p>
              <p className="line-through text-gray-500 text-sm">
                {item.originalPrice}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="absolute w-full bottom-[-5rem] left-1/2 transform -translate-x-1/2 bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition-all duration-500 group-hover:bottom-40"
            >
              Add to Cart <i className="fa fa-shopping-cart"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
