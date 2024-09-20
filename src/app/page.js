"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import AnimalForm from "./components/AnimalForm";
import CategoryForm from "./components/CategoryForm";
import DisplayAnimals from "./components/DisplayAnimals";
import DisplayCategories from "./components/DisplayCategories";

export default function Home() {
  const [showAnimalForm, setShowAnimalForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [animals, setAnimals] = useState([]);

  const animalFormRef = useRef(null); // For detecting clicks outside Animal form
  const categoryFormRef = useRef(null); // For detecting clicks outside Category form

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://task-backend-pgcb.onrender.com/api/v1/category/get"
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to fetch animals
  const fetchAnimals = async () => {
    try {
      const response = await axios.get(
        "https://task-backend-pgcb.onrender.com/api/v1/animals/get"
      );
      setAnimals(response.data.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAnimals();

    // Event listener for clicks outside the forms
    const handleClickOutside = (event) => {
      if (
        animalFormRef.current &&
        !animalFormRef.current.contains(event.target)
      ) {
        setShowAnimalForm(false);
      }
      if (
        categoryFormRef.current &&
        !categoryFormRef.current.contains(event.target)
      ) {
        setShowCategoryForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openAnimalForm = () => setShowAnimalForm(true);
  const openCategoryForm = () => setShowCategoryForm(true);

  const closeAnimalForm = () => setShowAnimalForm(false);
  const closeCategoryForm = () => setShowCategoryForm(false);

  return (
    <div className="h-screen mx-auto p-6 bg-black relative">
      {/* Buttons */}
      <div className="flex justify-between mb-6 ">
      <DisplayCategories categories={categories} />
        <div className="flex gap-2">
          <button
            onClick={openAnimalForm}
            className="px-4 py-2 border-2 border-white text-white rounded-full hover:bg-gray-900 hover:text-white transition duration-300"
          >
            Add Animal
          </button>
          <button
            onClick={openCategoryForm}
            className="px-4 py-2 border-2 border-white text-white rounded-full hover:bg-gray-900 hover:text-white transition duration-300"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {showAnimalForm && (
          <div
            ref={animalFormRef}
            className="absolute inset-0 flex justify-center items-center"
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
              <button
                onClick={closeAnimalForm}
                className="absolute top-2 right-2 text-black text-xl"
              >
                ✕
              </button>
              <AnimalForm onAnimalAdded={fetchAnimals} />
            </div>
          </div>
        )}
        {showCategoryForm && (
          <div
            ref={categoryFormRef}
            className="absolute inset-0 flex justify-center items-center"
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
              <button
                onClick={closeCategoryForm}
                className="absolute top-2 right-2 text-black text-xl"
              >
                ✕
              </button>
              <CategoryForm onCategoryAdded={fetchCategories} />
            </div>
          </div>
        )}
      </div>

      {/* Display */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mt-8">
        <DisplayAnimals animals={animals} />
      </div>
    </div>
  );
}
