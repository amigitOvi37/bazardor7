import React from 'react';
import Marquee from "react-fast-marquee";

interface marqueeData {
  image: string;
  nameBn: string;
  today: number,
  unit: string,
  change: {dir: string, pct: number}
}

const NavMarquee = async () => {
   const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    if (!res.ok) throw new Error("Failed to fetch price trakers");
    const data = await res.json() as marqueeData[];

   return (
     <div>
<div className="overflow-hidden border-t border-gray-100 py-2">
          <Marquee>
            <div className="flex w-full gap-2">
              {data.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs text-black-600 px-2 border-r border-gray-200"
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
              ))}
            </div>
          </Marquee>
        </div>
     </div>
   );
};

export default NavMarquee;