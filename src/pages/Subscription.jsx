import React, { useState } from "react";
import {
  FiCheckCircle,
  FiZap,
  FiTrendingUp,
  FiBriefcase,
} from "react-icons/fi";
import { toast } from "sonner";

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState("Free");

  const handleUpgrade = (planName) => {
    setCurrentPlan(planName);
    toast.success(`Successfully upgraded to ${planName} plan!`, {
      description: "Enjoy your new features ✨",
    });
  };

  const plans = [
    {
      name: "Free",
      icon: FiZap,
      target: "For Individuals",
      description:
        "Lorem ipsum dolor sit amet dolorol met conse ctetur adipiscing elit.",
      price: "$0",
      features: [
        "All basic features",
        "Up to 10,000 tracked visits",
        "Basic email support",
        "Up to 01 team member",
      ],
      buttonText: "Current Plan",
    },
    {
      name: "Pro",
      icon: FiTrendingUp,
      target: "For Startups",
      description:
        "Lorem ipsum dolor sit amet dolorol met conse ctetur adipiscing elit.",
      price: "$199",
      features: [
        "All basic features",
        "Up to 1,000,000 tracked visits",
        "Premium email support",
        "Up to 03 team members",
      ],
      buttonText: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Bussiness",
      icon: FiBriefcase,
      target: "For big companies",
      description:
        "Lorem ipsum dolor sit amet dolorol met conse ctetur adipiscing elit.",
      price: "$399",
      features: [
        "All basic features",
        "Up to 5,000,000 tracked visits",
        "Priority phone support",
        "Up to 10 team members",
      ],
      buttonText: "Upgrade to Bussiness",
    },
  ];

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border transition-all duration-300 flex flex-col ${
                currentPlan === plan.name
                  ? "border-violet-500 ring-4 ring-violet-500/10"
                  : "border-gray-100 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3 right-8 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Popular
                </span>
              )}

              {/* Icon & Target */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/40 rounded-2xl flex items-center justify-center border border-violet-100 dark:border-violet-800">
                  <plan.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {plan.target}
                  </p>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
                {plan.description}
              </p>

              <hr className="border-gray-100 dark:border-gray-700 mb-6" />

              {/* Price */}
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                  /monthly
                </span>
              </div>

              {/* Features */}
              <div className="flex-1 mb-8">
                <p className="text-xs font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">
                  What's included
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <FiCheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                      <span className="text-[13px] text-gray-600 dark:text-gray-300 leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                onClick={() => handleUpgrade(plan.name)}
                disabled={currentPlan === plan.name}
                className={`w-full py-3.5 rounded-xl text-[13px] font-bold transition-all ${
                  currentPlan === plan.name
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-200 dark:shadow-none active:scale-[0.98]"
                }`}
              >
                {currentPlan === plan.name ? "Current Plan" : plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
