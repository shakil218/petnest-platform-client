import PetDetailsClient from "@/components/pets/PetDetailsClient";

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/pets/${id}`, {
    cache: "no-store",
  });

  const pet = await res.json();

  console.log(id,pet);

  return (
    <div>
     <PetDetailsClient pet={pet} />
    </div>
  );
};

export default PetDetailsPage;