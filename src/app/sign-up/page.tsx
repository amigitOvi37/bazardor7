"use client";
import toast from "react-hot-toast";
import React from "react";
import { redirect } from "next/navigation";
import { authClient } from "../lib/auth-client";

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Successfully Created Your Account!");
      console.log(data);
      redirect("/");
    }

    if (error) {
      toast.error("User Already Exists!");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    if (error) {
      toast.error("Google Sign In Failed");
    }
  };

  const handleGithubSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
    });
    if (error) {
      toast.error("Github Sign In Failed");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[#f4f7f4] flex flex-col items-center justify-center p-4 font-sans">
        {/* Header section */}
        <div className="text-center mb-6 mt-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-sm text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                নাম
              </label>
              <input
                type="text"
                name="name"
                placeholder="যেমন: রহিম উদ্দিন"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm placeholder-gray-400"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm placeholder-gray-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm placeholder-gray-400"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                placeholder="আবার লিখুন"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0d823a] hover:bg-[#0b6e31] text-white font-medium py-3 rounded-lg transition duration-200 shadow-md text-base mt-2"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-5 items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink mx-4 text-gray-500 text-xs">অথবা</span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Login */}
            <button
              onClick={() => handleGoogleSignIn()}
              type="button"
              className="flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 text-sm font-medium text-gray-700 bg-white shadow-xs"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.6 3.6 1.7 7.4l3.7 2.9C6.3 7.3 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.4 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.7 6.4C.6 8.6 0 11.2 0 14s.6 5.4 1.7 7.6l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.7-2.3-6.6-5.3L1.7 15.9C3.6 19.7 7.4 23 12 23z"
                />
              </svg>
              Google দিয়ে চালিয়ে যান
            </button>

            {/* GitHub Login */}
            <button
              onClick={() => handleGithubSignIn()}
              type="button"
              className="flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 text-sm font-medium text-gray-700 bg-white shadow-xs"
            >
              <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6 text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <a href="#" className="text-green-600 font-medium hover:underline">
              সাইন ইন করুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
