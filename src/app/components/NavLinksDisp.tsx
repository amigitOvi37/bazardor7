import React from 'react';
import NavLinks from './NavLinks';

const NavLinksDisp = async () => {
   const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
if (!res.ok) throw new Error("Failed to fetch categories");
   const categories = await res.json();
   return (
      <div className=''>
         <NavLinks categories={categories} />
      </div>
   );
};

export default NavLinksDisp;