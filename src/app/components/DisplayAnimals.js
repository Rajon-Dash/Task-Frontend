
import { useState, useEffect } from "react";

export default function DisplayAnimals({ animals }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {animals.map((animal) => (
        <div key={animal._id}>
          <div className="bg-black rounded border-amber-50 shadow	 h-48 w-38 flex justify-center items-center ">
            <img src={animal.image.url} alt={animal.animalName} />
          </div>
          <h2 className="text-center text-white">{animal.animalName}</h2>
        </div>
      ))}
    </div>
  );
}
