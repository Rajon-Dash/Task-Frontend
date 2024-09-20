import { useState } from "react";
import axios from "axios";

export default function AnimalForm() {
  const [animalName, setAnimalName] = useState("");
  const [animalImage, setAnimalImage] = useState(null);

  const handleAnimalSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("animalName", animalName);
    formData.append("image", animalImage);

    try {
      const response = await axios.post('https://task-backend-pgcb.onrender.com/api/v1/animals/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Animal added successfully:', response.data);

      // Clear the form after successful submission
      setAnimalName("");
      setAnimalImage(null);

    } catch (error) {
      console.error('Error adding animal', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleAnimalSubmit} className="p-6 bg-white rounded-lg shadow-md w-80 mx-auto space-y-4" style={{ borderRadius: '25px' }}>
      <h2 className="text-lg font-semibold text-center mb-4">Add Animal</h2>

      <div>
        <input
          type="text"
          className="w-full bg-gray-100 text-gray-800 text-sm p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={animalName}
          onChange={(e) => setAnimalName(e.target.value)}
          placeholder="Animal Name"
        />
      </div>

      <div>
        <input
          type="file"
          className="w-full bg-gray-100 text-gray-800 text-sm p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          onChange={(e) => setAnimalImage(e.target.files[0])}
        />
      </div>

      <button
        type="submit"
        className="w-full text-white bg-black p-3 rounded-full hover:bg-gray-800 transition-all duration-200"
      >
        Create Animal
      </button>
    </form>
  );
}
