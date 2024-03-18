"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import CategoryItem from "~/components/categoryItem/CategoryItem"; 
import {useRouter} from "next/navigation";

function HomePage() {
  
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(6);
  const [verified, setVerified] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resUser = await axios.get("api/users/isverified");

        if(!resUser.data.user.isVerified){ 
          setVerified(false);
          router.push("/verifyemail"); }
        

        const res = await axios.get("api/categories");
        
        const allCategories = res.data.categories;
        setLoading(false);
        setCategories(allCategories);

      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const currentCategories = categories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main
      className="flex justify-center items-center m-10 sm:m-12">

      <div className='border-2 rounded-2xl w-full sm:w-2/5 h-1/2 sm:h-1/3 flex flex-col '>
      <div className="p-10">
      <div className='text-3xl font-semibold pb-4'>Please mark your interests!</div>
      <div className='text-base font-normal m-2 pb-4 flex items-center justify-center'>We will keep you notified</div>
      <div className=" h-full flex text-lg font-medium pb-6">My saved interests!</div>

      {!loading ? (<div className="  ">
        
          {currentCategories.map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}

            <div className="pagination-controls flex items-center justify-center pt-8">
              <button onClick={handlePreviousClick} disabled={currentPage === 1} className=" pr-3">
                &lt;
              </button >
              <div className="page-numbers  justify-center text-gray-400">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={` ${pageNumber === currentPage ? "text-black" : ""} pr-2`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
              <button onClick={handleNextClick} disabled={currentPage === totalPages} className="pl-3">
                &gt;
              </button>
            </div>

      </div>) : <h1 className="text-red-400">Loading...</h1>}

            {!verified && <h1>Verify your account</h1>}
      </div>     
      </div> 
    </main>
  );
}

export default HomePage;
