import React from "react";
import Link from "next/link";

interface ItemCardData {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: { dir: string; pct: number };
}

const ItemCard = ({ data }: { data: ItemCardData }) => {
  const isUp = data.change.dir === "up";

  return (
    <Link href={`/details/${data.id}`}>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 max-w-sm w-full flex flex-col justify-between transition-transform duration-300 hover:scale-105">
        {/* Top Section: Image, Name, and Unit */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#f4f7f4] rounded-2xl flex items-center justify-center p-2 relative shrink-0">
            {data.image}
          </div>
          <div>
            <h2 className=" font-bold text-gray-900">{data.nameBn}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{data.unit}</p>
          </div>
        </div>

        {/* Bottom Section: Price & Change Indicator */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <span className="text-xs text-gray-500 block mb-1">আজকের দাম</span>
            <div className="flex items-baseline gap-1.5">
              <span className=" font-bold text-gray-900">{data.today}</span>
              <span className="text-base font-medium text-gray-800">টাকা</span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isUp ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }
          `}
          >
            <span>{isUp ? "▲" : "▼"}</span>
            <span>{data.change.pct}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;