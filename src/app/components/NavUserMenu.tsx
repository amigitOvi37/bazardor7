"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategoryContext } from "@/app/context/Context";

const NavUserMenu = () => {
  const { user, isLoggedIn, isSessionLoading, signOutUser } =
    useCategoryContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Session still being restored from the cookie: avoid flashing logged-out UI
  if (isSessionLoading) {
    return (
      <div
        className="h-9 w-28 animate-pulse rounded-lg bg-gray-100"
        aria-hidden="true"
      />
    );
  }

  if (isLoggedIn && user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 cursor-pointer focus:outline-none py-1 px-2 rounded-lg hover:bg-gray-50 transition-colors"
          aria-expanded={isDropdownOpen}
          aria-label="Account menu"
        >
          <Image
            src={user.image || "/avatar.png"}
            alt={user.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">
            {user.name}
          </span>
          <svg
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* User Info Header */}
            <div className="pb-3 border-b border-gray-100">
              <p className="text-base font-bold text-gray-900 leading-snug">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
            </div>

            {/* Menu Options */}
            <div className="pt-3 space-y-1">
              <Link
                href="/Profile"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                আমার প্রোফাইল
              </Link>

              <button
                onClick={async () => {
                  setIsDropdownOpen(false);
                  await signOutUser();
                }}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
              >
                <svg
                  className="h-4 w-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                সাইন আউট
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Logged Out State: Sign In & Sign Up Buttons
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/sign-in"
        className="text-sm font-semibold text-gray-800 hover:text-green-600 transition-colors px-3 py-2"
      >
        সাইন ইন
      </Link>
      <Link
        href="/sign-up"
        className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default NavUserMenu;
