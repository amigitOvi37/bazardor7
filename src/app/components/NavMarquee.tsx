"use client";

import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import NavMarqueeItem from "./NavMarqueeItem";

interface marqueeData {
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: { dir: string; pct: number };
  id: number;
}

const NavMarquee = () => {
  const [data, setData] = useState<marqueeData[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setData(data as marqueeData[]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="overflow-hidden border-t border-gray-100 py-2">
        <Marquee play={!isPaused}>
          <div className="flex w-full gap-2">
            {data.map((item) => (
              <NavMarqueeItem
                key={item.id}
                item={item}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default NavMarquee;