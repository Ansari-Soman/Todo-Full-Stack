import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import useAuthAction from "../../Hooks/useAuthAction";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { logoutUser } = useAuthAction();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex gap-8 items-center">
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-200"
          >
            ✓ TodoApp
          </Link>
          <Link
            to="/dashboard"
            className="text-blue-50 hover:text-white font-medium transition-colors duration-200 hidden sm:block"
          >
            Home
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-blue-50 font-medium hidden md:inline-block mr-2">
                Welcome,{" "}
                <span className="text-white font-semibold">
                  {user.fullName || user.email}
                </span>
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-600 py-2 px-5 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Logout
              </button>

              <LogoutConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleLogout}
              />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 py-2 px-5 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-800 text-white py-2 px-5 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
