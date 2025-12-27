import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { LogOut, CheckSquare, User } from "lucide-react";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import useAuthAction from "../../Hooks/useAuthAction";
import Button from "./Button";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const { logoutUser } = useAuthAction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logoutUser();
    setIsLoading(false);

    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
  };

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-10 py-4">
        {/* Logo Section */}
        <div className="flex gap-8 items-center">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-2xl font-bold text-zinc-900 hover:text-violet-600 transition-colors"
          >
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
              <CheckSquare size={20} strokeWidth={3} />
            </div>
            <span>TodoApp</span>
          </Link>
        </div>

        {/* User / Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600">
                  <User size={16} />
                </div>
                <span className="text-zinc-600 font-medium text-sm">
                  {user.fullName || user.email}
                </span>
              </div>

              <Button
                onClick={() => setIsModalOpen(true)}
                variant="ghost"
                className="text-zinc-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut size={20} className="sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>

              <LogoutConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleLogout}
              />
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
