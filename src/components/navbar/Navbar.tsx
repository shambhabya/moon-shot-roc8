import React from 'react';
import cart from "../../../public/cart.png";
import search from "../../../public/search.png";
import Image from 'next/image';

function Navbar() {
  return (
    <div className=''>
      <div className='flex justify-end gap-5 pl-5 pr-5 pt-3 text-xs font-normal md:pl-10 md:pr-10'>
        <div>Help</div>
        <div>Orders & Returns</div>
        <div>Hi, John</div>
      </div>

      <div className='flex flex-col md:flex-row justify-between pl-5 pr-5 pt-3 pb-3 items-center md:pl-10 md:pr-10'>
        <div className='font-bold text-2xl md:text-3xl'>ECOMMERCE</div>
        <div className='flex gap-3 md:gap-6 font-semibold text-lg '>
          <div>Categories</div>
          <div>Sale</div>
          <div>Clearance</div>
          <div>New Stock</div>
          <div>Trending</div>
        </div>
        <div className='flex gap-4'>
          <div><Image height={19.5} width={19.5} alt='search' src={search} /></div>
          <div><Image height={19.5} width={19.5} alt='cart' src={cart} /></div>
        </div>
      </div>

      <div className='flex justify-center pt-2 pb-2 text-xs font-medium items-center' style={{ background: "#F4F4F4" }}>
        &lt; Get 10% off on business signup &gt;
      </div>
    </div>
  );
}

export default Navbar;
