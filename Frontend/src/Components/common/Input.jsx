import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ type, placeholder, label, onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <div
        className={`
        flex items-center w-full border-2 px-4 py-3 rounded-lg
        transition-all duration-200 bg-white
        ${
          isFocused
            ? "border-blue-500 ring-2 ring-blue-100"
            : "border-gray-300 hover:border-gray-400"
        }
      `}
      >
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="ml-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
