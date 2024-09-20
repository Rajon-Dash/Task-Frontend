import axios from "axios";
import { useState, useEffect } from "react";

export default function DisplayCategories({categories}) {

  return (
    <div className="flex space-x-2 ">
      {/* <h1>Categories: {categories.length}</h1> */}
      
        {categories.map((category) => (
          <button key={category._id} className="px-4 py-2 border-2 border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition duration-300">
            {category.categoryName}
          </button>
        ))}

      
    </div>
    
  );
}
