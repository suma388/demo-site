import React from "react";
import { FaFacebook, FaTwitter, FaGithub, FaDev } from "react-icons/fa";
import Logo from "../assets/logo-light.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0e172b] mt-5 md:mt-10 text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <img src={Logo} alt="logo" />
          <p className="text-sm mb-6">
            Powerful SaaS platform to build modern applications easily. created
            using SaaSBold
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg">
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaDev className="cursor-pointer hover:text-white" />
            <FaGithub className="cursor-pointer hover:text-white" />
            <FaFacebook className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Column 1 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Integrations</li>
            <li className="hover:text-white cursor-pointer">Pricing & Plans</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Our Blog</li>
            <li className="hover:text-white cursor-pointer">Heatmaps</li>
            <li className="hover:text-white cursor-pointer">
              Affiliate Program
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Our Story</li>
            <li className="hover:text-white cursor-pointer">Work with Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © 2026 SaaSBold. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
