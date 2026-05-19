import UpdatePetClient from "@/components/dashboard/UpdatePetClient";

export const dynamic = "force-dynamic";

async function getPet(id) {
  try {
    const res = await fetch(`http://localhost:5000/pets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function UpdatePetPage({ params }) {
  const {id} = await params;
  const pet = await getPet(id);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold">Pet Not Found</h1>
          <p className="text-sm text-gray-500">
            The pet you are trying to edit does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return <UpdatePetClient pet={pet} />;
}