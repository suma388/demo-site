import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Subscription = () => {
  const plans = [
    {
      id: 1,
      name: "Free",
      price: 0,
      type: "For Individuals",
      popular: false,
      features: ["Basic features", "Limited access"],
    },
    {
      id: 2,
      name: "Pro",
      price: 199,
      type: "For Startups",
      popular: true,
      features: [
        "All basic features",
        "Up to 1,000,000 tracked visits",
        "Premium email support",
        "Up to 03 team members",
      ],
    },
    {
      id: 3,
      name: "Business",
      price: 399,
      type: "For big companies",
      popular: false,
      features: [
        "All Pro features",
        "Unlimited tracked visits",
        "Priority support",
        "Unlimited team members",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-10 px-4 transition duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl shadow-md p-6 text-center relative hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            {/* Popular Badge */}
            {plan.popular && (
              <span className="absolute top-4 right-4 bg-purple-100 dark:bg-purple-900 dark:text-purple-300 text-purple-600 text-xs px-2 py-1 rounded-full">
                Popular
              </span>
            )}

            {/* Title */}
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {plan.type}
            </p>
            <h2 className="text-xl font-bold mt-1">{plan.name}</h2>

            {/* Description */}
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              {plan.name === "Free" &&
                "Get started with essential features at no cost. Perfect for beginners exploring the platform."}

              {plan.name === "Pro" &&
                "Unlock advanced tools and higher limits to grow your projects faster and more efficiently."}

              {plan.name === "Business" &&
                "Designed for teams and companies needing full access, scalability, and priority support."}
            </p>

            {/* Price */}
            <h1 className="text-4xl font-bold mt-6">
              {plan.price === 0 ? (
                "Free"
              ) : (
                <>
                  ${plan.price}
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    /monthly
                  </span>
                </>
              )}
            </h1>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

            {/* Features */}
            <div className="text-left space-y-3 text-sm">
              {plan.features.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-500" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className={`mt-6 w-full py-2 rounded-full font-medium transition duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {plan.name === "Free"
                ? "Current Plan"
                : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
