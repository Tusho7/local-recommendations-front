import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Logout } from "./services/admin/api/Auth";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [selectedNavItem, setSelectedNavItem] = useState("home");

  const handleNavItemChange = async (item: string) => {
    setSelectedNavItem(item);
    switch (item) {
      case "home":
        navigate("/admin_dashboard");
        break;
      case "profile":
        navigate("/admin_profile");
        break;
      case "categories":
        navigate("/admin_categories");
        break;
      case "recommendations":
        navigate("/admin_recommendations");
        break;
      case "logout":
        await handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await Logout();
      localStorage.clear();
      navigate("/admin_login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-gray-900 text-white w-64 flex flex-col">
        <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
          <h1 className="text-lg font-semibold">Local Recommendations</h1>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li
              className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                selectedNavItem === "home" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => handleNavItemChange("home")}
            >
              მთავარი
            </li>
            <li
              className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                selectedNavItem === "profile"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleNavItemChange("profile")}
            >
              პროფილი
            </li>
            <li
              className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                selectedNavItem === "categories"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleNavItemChange("categories")}
            >
              კატეგორიები
            </li>
            <li
              className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                selectedNavItem === "recommendations"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleNavItemChange("recommendations")}
            >
              რეკომენდაციები
            </li>
            <li
              className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                selectedNavItem === "logout"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleNavItemChange("logout")}
            >
              გამოსვლა
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
