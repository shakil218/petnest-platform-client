import MyListingsClient from "@/components/dashboard/MyListingsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getListingsData() {
  try {
    // Fetch user session securely on the server side
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user?.email) {
      return [];
    }

    const userEmail = session.user.email;

    // Fetch data directly from your Express live server API endpoint
    const res = await fetch(`http://localhost:5000/my-listings?email=${userEmail}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to pull collections data records from backend app layout.");
    }

    return await res.json();
  } catch (error) {
    console.error("Express API connection failure inside server component:", error);
    return [];
  }
}

export default async function MyListingsPage() {
  const initialPets = await getListingsData();

  return <MyListingsClient initialPets={initialPets} />;
}