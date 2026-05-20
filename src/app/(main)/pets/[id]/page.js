import PetDetailsClient from "@/components/pets/PetDetailsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

// Dynamic metadata generation for clean SEO rendering paths
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`);
    if (!res.ok) return { title: "Pet Profile | PetNest" };

    const pet = await res.json();
    return {
      title: `${pet?.name || "Pet Details"} | PetNest Adoption`,
      description:
        pet?.description || "Find your perfect animal companion today.",
    };
  } catch {
    return { title: "Pet Profile | PetNest" };
  }
}

export default async function PetDetailsPage({ params }) {
  const { id } = await params;

  const {token} = await auth.api.getToken({
      headers: await headers(),
  });
  // Fetch raw pet documents cleanly from your backend deployment server setup
  let pet = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      pet = await res.json();
    }
  } catch (error) {
    console.error(
      "Failed to compile details payload from Express server:",
      error,
    );
  }

  // Handle case where target pet does not exist in your MongoDB records clusters
  if (!pet) {
    return (
      <div className="min-h-screen bg-base-300 flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-xl font-black text-base-content">
          Pet Listing Not Found
        </h2>
        <p className="text-sm text-base-content/60 mt-1">
          This listing may have been permanently removed by the owner.
        </p>
      </div>
    );
  }

  return <PetDetailsClient pet={pet} />;
}
