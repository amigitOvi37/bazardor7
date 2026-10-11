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

const PrcDecrease = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );
  if (!res.ok) throw new Error("Failed to fetch products!");
  const data = (await res.json()) as itemCardData[];
  const decData = data.filter((item) => item.change.dir === "down").slice(0, 6);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      {/* Title */}
      <div className="font-bold text-xl text-gray-900 flex items-center gap-2">
        <span className="text-green-600">▼</span> আজ দাম কমেছে
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {decData.map((item) => (
          <div key={item.id} className="w-full">
            <ItemCard data={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrcDecrease;
