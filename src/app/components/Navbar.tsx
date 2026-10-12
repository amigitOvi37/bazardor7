import React from "react";
import NavUserMenu from "@/app/components/NavUserMenu";
import { Suspense } from "react";
import NavMarquee from "./NavMarquee";
import NavLinksDisp from "./NavLinksDisp";
import { ThreeDot } from "react-loading-indicators";



const Navbar = () => {
  return (
    <div>
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-green-600 flex items-center justify-center text-white">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">
                    বাজার দর
                  </h1>
                  <p className="text-xs text-gray-500">
                    মঙ্গলবার, ৬ অক্টোবর, ২০২৬
                  </p>
                </div>
              </div>

              {/* Isolated User Authentication Component */}
              <NavUserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <Suspense
          fallback={
            <div className="flex justify-center py-2">
              <ThreeDot color="#32cd32" size="small" text="" textColor="" />
            </div>
          }
        >
          <NavLinksDisp />
          <NavMarquee />
        </Suspense>
      </div>
    </div>
  );
};

export default Navbar;
