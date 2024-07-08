import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/api/Auth";
import { useUser } from "../contexts/UseUser";
import Profile from "./Profile";
import { useNotifications } from "../contexts/UseNotification";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const notification = useNotifications();

  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/login";
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-gray-800  shadow-md">
      <div className="px-4 py-4 flex justify-between items-center xl:px-0 max-w-[1200px] mx-auto">
        <Link to="/home" className="text-2xl font-bold text-white">
          Local Recommendations
        </Link>
        <nav className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none"
          >
            <img
              src={`${import.meta.env.VITE_API_STORAGE}${user?.profilePicture}`}
              alt={`${user?.firstName}'s Profile Picture`}
              className="w-10 h-10 rounded-full object-cover"
            />

            {notification.notifications.length > 0 && (
              <div className="relative flex justify-between items-center">
                <span className="absolute -top-11 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {notification.notifications.length}
                </span>
              </div>
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <Profile />
              <div className="w-full bg-slate-600 h-[1px]"></div>

              <Link
                to="/home"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                მთავარი
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                პროფილი
              </Link>
              <Link
                to="/about_us"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                ჩვენ შესახებ
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                კონტაქტი
              </Link>
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-start"
                onClick={handleLogout}
              >
                გამოსვლა
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
