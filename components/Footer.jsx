import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-white py-10 mt-0">
      {/* Gradient Border - Top */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#7265df] to-yellow-400"></div>

      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & About Section */}
          <div>
            <Image src={logo} alt="Logo" width={120} height={40} className="mx-auto md:mx-0" />
            <p className="mt-3 text-gray-400 text-sm">
              Your trusted rental property management platform.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li>
                <a href="/properties" className="hover:text-[#7265df] transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#7265df] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-[#7265df] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-3 flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#7265df] transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#7265df] transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#7265df] transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#7265df] transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} NilRentTrack. All rights reserved.
          </p>
        </div>
      </div>

      {/* Gradient Border - Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-yellow-400 to-[#7265df]"></div>
    </footer>
  );
};

export default Footer;
