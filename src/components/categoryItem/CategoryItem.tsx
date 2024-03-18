import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

function CategoryItem({ category }: {category: any}) {
  const [isSelected, setIsSelected] = useState(false); 

  useEffect(() => {
    
    const fetchSelection = async () =>{
        try{
            const res = await axios.post("/api/categories/category", category);
            console.log("row-",res.data);
            if(res.data.row === null) setIsSelected(false)
            else setIsSelected(true);
        }catch(err){
            console.log("error fetching selection-",err);
        }
    }

    fetchSelection();
    
  }, [category.id]); 

  const handleChange = async (event: any) => {
    const newIsSelected = event.target.checked;
    setIsSelected(newIsSelected);

    try{
    const res = await axios.post("/api/categories/createcategory", category);
    console.log("new row-", res.data.Row);
    }catch(err){
        console.log("error:",err)
    }

  };

  return (
    <div key={category.id} className='pb-5 flex'>
      <input type="checkbox" checked={isSelected} onChange={handleChange} className=' rounded w-6 h-6 accent-slate-500'/>
      <label className='pl-3 font-normal text-base'>{category.name}</label>
    </div>
  );
}

export default CategoryItem;