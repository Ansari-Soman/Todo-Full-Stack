import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  isLoading = false,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  // Base styles shared by all buttons
  const baseStyles =
    "cursor-pointer inline-flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variants 
  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/30 focus:ring-violet-500",
    outline:
      "border-2 border-zinc-200 hover:border-violet-600 hover:text-violet-600 text-zinc-600 bg-transparent focus:ring-zinc-400",
    ghost:
      "bg-transparent hover:bg-violet-50 text-violet-600 hover:text-violet-700 focus:ring-violet-200",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
