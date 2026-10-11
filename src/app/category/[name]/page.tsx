"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ItemCard from "@/app/components/ItemCard";

interface itemCardData {
  id: number;
  image: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  today: number;
  unit: string;
  change: { dir: string; pct: number };
}

export default function CategoryPage() {
  const { name } = useParams();

  const [data, setData] = useState<itemCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<string>("default");

  // Fetch data and resolve params on mount
  useEffect(() => {
    async function loadData() {
      try {

        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
        if (!res.ok) throw new Error("Failed to fetch products!");

        const json = (await res.json()) as itemCardData[];
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f6f0] flex items-center justify-center text-gray-600">
        লোড হচ্ছে...
      </div>
    );
  }

  // Filter products by category
  const decData = data.filter((item) => item.category === name);

  // Sort products based on selected option
  const sortedData = [...decData].sort((a, b) => {
    if (sortOrder === "price-low") {
      return a.today - b.today; // Low to High
    }
    if (sortOrder === "price-high") {
      return b.today - a.today; // High to Low
    }
    return 0; // Default order
  });

  const bannerImage = decData[0]?.image || "📦";

  return (
    <div className="bg-[#f4f6f0] p-4 md:p-8 pb-12 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Banner Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center p-2 shadow-inner relative text-xl">
            {bannerImage}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-950">
              {decData[0]?.categoryNameBn || name}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {decData.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Filter / Sort Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            মোট {decData.length}টি পণ্য দেখানো হচ্ছে
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">সাজান</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedData.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm border border-gray-100">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedData.map((item) => (
              <ItemCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
