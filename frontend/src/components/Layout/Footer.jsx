import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={`bg-[#18191c] text-white p-5 ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto">
        <div className="flex justify-between flex-wrap">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">JobQuest</h2>
            <p className="sm">&copy; All Rights Reserved By JobQuest 2024</p>
          </div>

          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul>
              <li className="mb-1"><Link to="/jobs" className="hover:underline">Jobs</Link></li>
              <li className="mb-1"><Link to="/about" className="hover:underline">About Us</Link></li>
              <li className="mb-1"><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li className="mb-1"><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <p className="mb-1">123 JobQuest Street</p>
            <p className="mb-1">City, Country 12345</p>
            <p className="mb-1">Email: info@jobquest.com</p>
            <p>Phone: +123 456 7890</p>
          </div>

          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <Link to="https://facebook.com/profile.php?id=61559775999695" target="_blank">
                <FaFacebookF className="text-xl hover:text-blue-500" />
              </Link>
              <Link to="https://www.youtube.com" target="_blank">
                <FaYoutube className="text-xl hover:text-red-500" />
              </Link>
              <Link to="https://www.linkedin.com" target="_blank">
                <FaLinkedin className="text-xl hover:text-blue-700" />
              </Link>
              <Link to="https://www.instagram.com" target="_blank">
                <RiInstagramFill className="text-xl hover:text-pink-500" />
              </Link>
              <Link to="https://www.twitter.com" target="_blank">
                <FaTwitter className="text-xl hover:text-blue-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
