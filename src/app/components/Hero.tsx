"use client";
import Image from "next/image";
import React from "react";
import basket from "@/app/assets/bazar-hero.png";

const Hero = () => {
  return (
    <div>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 lg:p-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-5 max-w-7xl mx-auto">
            {/* Text */}
            <div className="flex-1">
              <span className="inline-block bg-green-50 border border-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬{" "}
              </span>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                আজকের বাজারের দাম এক নজরে
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed max-w-xl">
                চাল, ডাল, তেল, সবজি, মাছ, মুরগি, ডিম ও ফলের দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন সহ জানুন।
              </p>
              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                সব দর দেখুন
              </button>
            </div>
            {/* Basket illustration */}
            <div className="flex-1 flex justify-center">
              <Image
                src={basket}
                alt="Basket illustration"
                width={400}
                height={400}
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;