import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  type = "text",
  placeholder,
  label,
  onChange,
  value,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}

      <div
        className={`
          relative flex items-center w-full border-2 rounded-xl transition-all duration-200 bg-zinc-50
          ${
            error
              ? "border-red-300 bg-red-50 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10"
              : isFocused
              ? "border-violet-500 bg-white ring-4 ring-violet-500/10"
              : "border-zinc-200 hover:border-zinc-300 hover:bg-white"
          }
        `}
      >
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-3 bg-transparent outline-none text-zinc-900 placeholder-zinc-400 rounded-xl"
          {...props}
        />

        {/* Password Toggle Button */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 animate-pulse">{error}</p>}
    </div>
  );
};

export default Input;
