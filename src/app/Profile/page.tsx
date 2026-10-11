"use client";
import React from "react";
import Image from "next/image";
import { authClient } from "@/app/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please sign in first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Top User Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-200">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">
                    {user.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {user.name || "User"}
              </h2>
              <p className="text-sm text-gray-500">
                {user.email || ""}
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto justify-center">
            <span>সাইন আউট</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Bottom Info / Update Form Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-lg font-bold text-gray-900">তথ্য</h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              নাম
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50/50"
              defaultValue={user.name || ""}
            />

            <button className="w-full bg-[#00873e] hover:bg-[#007233] text-white font-medium py-3.5 px-4 rounded-xl shadow-sm transition-colors text-center">
              আপডেট
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;