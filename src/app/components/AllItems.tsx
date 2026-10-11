import React from "react";
import ItemCard from "./ItemCard";

interface itemCardData {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: { dir: string; pct: number };
}

const AllItems = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  if (!res.ok) throw new Error("Failed to fetch products!");
  const data = (await res.json()) as itemCardData[];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      {/* Header */}
      <div>
        <h2 className="font-bold text-xl text-gray-900">সব পণ্য</h2>
        <p className="text-gray-500 text-sm mt-1">
          মোট {data.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map((item) => (
          <div key={item.id} className="w-full">
            <ItemCard data={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllItems;
