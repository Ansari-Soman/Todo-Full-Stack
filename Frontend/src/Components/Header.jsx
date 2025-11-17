import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container mx-auto flex justify-between items-center my-1 px-4 py-2 bg-white shadow-lg">
        <div className="flex gap-6 items-center">
          <h1 className="text-2xl text-blue-500 font-bold">TodoApp</h1>
          <Link to="/" className="text-gray-700 font-semibold cursor-pointer ">
            Home
          </Link>
        </div>

        <div className="space-x-3">
          <Link to='/login' className="bg-gray-200 py-2 px-4 rounded-lg font-semibold text-blue-500 cursor-pointer hover:bg-gray-300 transition-colors duration-300 w-24">
            Login
          </Link>
          <Link to='/signup' className="text-gray-200 py-2 px-4 rounded-lg font-semibold bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors duration-300 w-24">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
