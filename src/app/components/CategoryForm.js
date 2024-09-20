

import { useState } from "react";
import axios from "axios";

export default function CategoryForm({ onCategoryAdded }) {
  const [categoryName, setCategoryName] = useState("");

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://task-backend-pgcb.onrender.com/api/v1/category/add", {
        categoryName, // Ensure the field matches the backend
      });
      alert("Category added successfully!");
      
      // Clear the form after successful submission
      setCategoryName("");

      // Callback to update categories after adding a new one
      onCategoryAdded();
    } catch (error) {
      console.error("Error adding category", error.response ? error.response.data : error.message);
    }
  };

  return (
    <form
      onSubmit={handleCategorySubmit}
      className="p-6 bg-white rounded-lg shadow-md w-80 mx-auto"
      style={{ borderRadius: "25px" }} 
    >
      <h2 className="text-lg font-semibold text-center mb-4">Add Category</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full bg-gray-100 text-gray-800 text-sm p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-black p-3 rounded-full hover:bg-gray-800 transition-all duration-200"
      >
        Save
      </button>
    </form>
  );
}
