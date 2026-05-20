import FeaturedPets from "@/components/pets/FeaturedPets";

export const metadata = {
  title: "Available Pets for Adoption - Pet Adoption Platform",
  description: "Browse our available pets for adoption and find your new furry friend. We have a variety of pets looking for loving homes.",
};

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
