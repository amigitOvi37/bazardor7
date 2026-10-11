import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 shadow-sm mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
        {/* Left Side: Title */}
        <h1 className="text-xs sm:text-sm text-gray-500">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </h1>

        {/* Right Side: Disclaimer Note */}
        <p className="text-xs sm:text-sm text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
