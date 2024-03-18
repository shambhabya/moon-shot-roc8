import React from 'react'
import cart from "../../../public/cart.png"
import search from "../../../public/search.png"
import Image from 'next/image'

function Navbar() {
  return (
    <div className=' '>
        <div className=' flex justify-end gap-5 pl-10 pr-10 pt-3 text-xs font-normal'>
            <div>Help</div>
            <div>Orders & Returns</div>
            <div>Hi, John</div>
        </div>

        <div className='flex justify-between pl-10 pr-10 pt-3 pb-3 items-center'>
            <div className=' font-bold text-3xl'>ECOMMERCE</div>
            <div className='flex gap-6 font-semibold text-lg '>
                <div>Categories</div>
                <div>Sale</div>
                <div>Clearance</div>
                <div>New Stock</div>
                <div>Trending</div>
            </div>
            <div className='flex gap-4'>
                <div><Image height={19.5} width={19.5} alt='search'  src={search}></Image></div>
                <div><Image height={19.5} width={19.5} alt='cart' src={cart}></Image></div>
            </div>
        </div>

        <div className='flex justify-center pt-2 pb-2 text-sm font-medium items-center' style={{background:"#F4F4F4"}}>
            &lt; Get 10% off on business signup &gt;
        </div>
    </div>
  )
}

export default Navbar