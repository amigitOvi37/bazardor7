"use client";

import React from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { ThreeDot } from "react-loading-indicators";
import { IoPersonCircleOutline } from "react-icons/io5";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      setMessage("");

      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      setMessage("সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleUpdate = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setMessage("নাম খালি রাখা যাবে না।");
      return;
    }

    try {
      setIsUpdating(true);
      setMessage("");

      await authClient.updateUser({
        name: trimmedName,
      });

      setName(trimmedName);
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch (error) {
      console.error("Update error:", error);
      setMessage("নাম আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f3f4f6] p-6">
        <p className="text-gray-700">
          আপনার প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন।
        </p>

        <button
          onClick={() => router.push("/")}
          className="rounded-xl bg-[#00873e] px-5 py-3 font-medium text-white hover:bg-[#007233]"
        >
          হোম পেজে ফিরে যান
        </button>
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
            <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0 bg-gray-200 flex items-center justify-center">
              <IoPersonCircleOutline className="h-20 w-20 justify-items-center text-gray-400" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-gray-900 wrap-break-word">
                {user.name || "User"}
              </h2>

              <p className="text-sm text-gray-500 break-all">
                {user.email || ""}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto justify-center"
          >
            <span>{isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>

        {/* Profile Update Form */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-lg font-bold text-gray-900">তথ্য</h3>

          <div className="space-y-2">
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage("");
              }}
              disabled={isUpdating}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50/50 disabled:opacity-60"
            />

            {message && (
              <p
                role="status"
                className={`text-sm ${
                  message.includes("সফলভাবে")
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <button
              onClick={handleUpdate}
              disabled={isUpdating || name.trim() === (user.name || "")}
              className="w-full bg-[#00873e] hover:bg-[#007233] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 px-4 rounded-xl shadow-sm transition-colors text-center"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
