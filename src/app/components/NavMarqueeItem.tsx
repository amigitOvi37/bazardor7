import React from "react";
import Link from "next/link";

interface MarqueeItemData {
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: { dir: string; pct: number };
  id: number;
}

const NavMarqueeItem = ({
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  item: MarqueeItemData;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  return (
    <Link href={`/details/${item.id}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div
        className="flex items-center gap-1.5 text-xs text-black px-2 border-r border-gray-200"
      >
        <span>{item.image}</span>
        <span className="font-medium">{item.nameBn}</span>
        <span>{item.today} টাকা/{item.unit}</span>
        <span
          className={
            item.change.dir === "up"
              ? "text-green-600"
              : "text-red-500"
          }
        >
          {item.change.dir === "up" ? "▲" : "▼"} {item.change.pct}
        </span>
      </div>
    </Link>
  );
};

export default NavMarqueeItem;