import AddPetClient from "@/components/dashboard/AddPetClient";

export const metadata = {
  title: "Add a Pet - Pet Adoption Platform",
  description: "Add a pet to our adoption platform and help find a loving home for a pet in need. Share the story and details of the pet to connect with potential adopters.",
};

export const dynamic = "force-dynamic";

export default function AddPetPage() {
  return <AddPetClient />;
}