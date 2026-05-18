import FeaturedPets from "@/components/pets/FeaturedPets";
import React from "react";

const PetsPage = async () => {
  const res = await fetch("http://localhost:5000/pets",{cache:"no-store"});
  const pets = await res.json();

  return (
    <div>
      <FeaturedPets pets={pets} />
    </div>
  );
};

export default PetsPage;
