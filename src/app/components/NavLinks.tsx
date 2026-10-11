"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname(); // 2. Get the current active route path

  return (
    <div>
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="grid grid-cols-1 sm:flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-none">
            {categories.map((c) => {
              // 3. Check if the current URL matches this category's link
              const isActive = pathname === `/category/${c.slug}`;

              return (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className={`flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-2xl text-sm transition-colors ${
                    isActive
                      ? "bg-green-700 text-white font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <span>{c.icon}</span>
                  {c.nameBn}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavLinks;
