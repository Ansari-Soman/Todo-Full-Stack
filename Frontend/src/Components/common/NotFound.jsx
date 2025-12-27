import React from "react";
import { Link } from "react-router-dom";
import { Home, HelpCircle } from "lucide-react";
import Button from "./Button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-center">
      {/* 404 Text */}
      <h1 className="text-9xl font-black text-violet-100">404</h1>

      <div className="relative -mt-12 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg text-violet-600 mb-4">
          <HelpCircle size={32} />
        </div>

        <h2 className="text-3xl font-bold text-zinc-800">Page not found</h2>
        <p className="text-zinc-500 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <div className="pt-4">
          <Link to="/">
            <Button className="px-8">
              <Home size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
