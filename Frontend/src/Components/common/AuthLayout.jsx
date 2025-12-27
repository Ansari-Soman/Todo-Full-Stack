import React from "react";
import { CheckCircle2, LayoutDashboard } from "lucide-react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* LEFT SIDE - Visual Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-violet-600 relative overflow-hidden items-center justify-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content over the background */}
        <div className="relative z-10 p-12 text-white max-w-lg">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
            <LayoutDashboard size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Manage your tasks with focus and clarity.
          </h1>
          <div className="space-y-4">
            <FeatureRow text="Organize tasks efficiently" />
            <FeatureRow text="Track your productivity stats" />
            <FeatureRow text="Collaborate in real-time" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-zinc-200/50 border border-zinc-100">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex justify-center mb-4">
            <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center text-white">
              <LayoutDashboard size={24} />
            </div>
          </div>

          {/* Dynamic Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-zinc-500">{subtitle}</p>
          </div>

          {/* The Form (Children) goes here */}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the list on the left side
const FeatureRow = ({ text }) => (
  <div className="flex items-center space-x-3 text-violet-100">
    <CheckCircle2 size={20} className="text-violet-300" />
    <span className="text-lg font-medium">{text}</span>
  </div>
);

export default AuthLayout;
