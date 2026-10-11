import React from "react";
import Link from "next/link";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface PriceChange {
  dir: "up" | "down" | "stable";
  pct: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: Market[];
}

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch products!");
  const data = (await res.json()) as Product;

  // Calculate Summary metrics from markets array
  const minPrice =
    data.markets && data.markets.length > 0
      ? Math.min(...data.markets.map((m) => m.min))
      : data.today;

  const maxPrice =
    data.markets && data.markets.length > 0
      ? Math.max(...data.markets.map((m) => m.max))
      : data.today;

  const avgPrice =
    data.markets && data.markets.length > 0
      ? (
          data.markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
          data.markets.length
        ).toFixed(1)
      : data.today;

  return (
    <div className="bg-[#f2f4f2] py-8 px-4 font-sans text-gray-800">
      {/* Container to handle mx-auto and max-width for the layout */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-65 flex items-center space-x-2">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>{">"}</span>
          <Link href="/chal" className="hover:underline">
            {data.categoryNameBn}
          </Link>
          <span>{">"}</span>
          <span className="text-gray-900 font-medium">{data.nameBn}</span>
        </nav>

        {/* Main Product Card */}
        <div className="mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Section: Image and Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full md:w-auto text-center sm:text-left">
            {/* Rice Image Box */}
            <div className="relative w-24 h-24 bg-[#f4f5f4] rounded-2xl flex items-center justify-center shrink-0">
              {data.image}
            </div>

            {/* Text Information */}
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {data.nameBn}
              </h1>
              <p className="text-sm text-gray-500">প্রতি {data.unit} · চাল</p>
              <p className="text-sm text-gray-700 pt-1">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="text-red-600 font-medium">
                  {data.change.dir === "up" ? "বেড়েছে" : "কমেছে"}
                </span>{" "}
                · {Math.abs(data.yesterday - data.today)} টাকা
              </p>
            </div>
          </div>

          {/* Right Section: Price Badge / Box */}
          <div className="bg-[#f2f5f3] rounded-2xl px-8 py-4 text-center shrink-0 w-full sm:w-auto">
            <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {data.today}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">টাকা / {data.unit}</p>

            {/* Percentage change */}
            <div
              className={`flex items-center justify-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                data.change.dir === "up"
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              } mt-2`}
            >
              <span>{data.change.dir === "up" ? "▲" : "▼"}</span>
              <span>{data.change.pct}%</span>
            </div>
          </div>
        </div>

        {/* দামের সারসংক্ষেপ (Price Summary Cards) */}
        <div className="mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Min Price Card */}
            <div className="bg-[#f9faf9] border border-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">সর্বনিম্ন দাম</p>
              <div className="text-2xl font-bold text-emerald-600">
                {minPrice} <span className="text-sm font-normal">টাকা</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Max Price Card */}
            <div className="bg-[#f9faf9] border border-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">সর্বাধিক দাম</p>
              <div className="text-2xl font-bold text-red-600">
                {maxPrice} <span className="text-sm font-normal">টাকা</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price Card */}
            <div className="bg-[#f9faf9] border border-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">গড় দাম</p>
              <div className="text-2xl font-bold text-emerald-600">
                {avgPrice} <span className="text-sm font-normal">টাকা</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                প্রতি {data.unit}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম (Market-wise Price Table) */}
        <div className="mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 overflow-x-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>
          {/* Fixed invalid min-w-150 class */}
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500">
                <th className="py-3 font-medium">বাজার</th>
                <th className="py-3 font-medium">বিভাগ</th>
                <th className="py-3 font-medium">সর্বনিম্ন</th>
                <th className="py-3 font-medium">সর্বাধিক</th>
                <th className="py-3 font-medium text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {data.markets?.map((item, index) => {
                const itemAvg = ((item.min + item.max) / 2).toFixed(2);
                return (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 font-medium text-gray-900">
                      {item.market}
                    </td>
                    <td className="py-3.5 text-gray-600">{item.division}</td>
                    <td className="py-3.5 text-gray-800">{item.min} টাকা</td>
                    <td className="py-3.5 text-gray-800">{item.max} টাকা</td>
                    <td className="py-3.5 text-right font-semibold text-gray-900">
                      {itemAvg} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
