import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number; 
  name: string;
}

interface CategorySelectionResponse {
  row?: Category; 
}

interface UpdateCategoryResponse {
  row?: Category;
}


function CategoryItem({ category }: { category: Category }) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const fetchSelection = async () => {
      try {
        const res = await axios.post<CategorySelectionResponse>("/api/categories/category", category);
        console.log(res.data.row);
        setIsSelected(res.data.row !== null);
      } catch (err) {
        console.error("Error fetching selection:", err);
      }
    };
  
    fetchSelection();
  }, [category.id]);
  

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsSelected = event.target.checked;
    setIsSelected(newIsSelected);

    try {
      const res = await axios.post<UpdateCategoryResponse>("/api/categories/updatecategory", category);
      console.log("New row:", res.data.row); 
    } catch (err) {
      console.error("Error:", err);
     
    }
  };

  return (
    <div key={category.id} className="pb-5 flex">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleChange}
        className="rounded w-6 h-6 accent-slate-500"
      />
      <label className="pl-3 font-normal text-base">{category.name}</label>
    </div>
  );
}

export default CategoryItem;
