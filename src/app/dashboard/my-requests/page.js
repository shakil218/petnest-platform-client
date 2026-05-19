import MyRequestsClient from "@/components/dashboard/MyRequestsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getRequests() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) return [];

    const email = session.user.email;

    const res = await fetch(
      `http://localhost:5000/my-requests?email=${email}`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function MyRequestsPage() {
  const initialRequests = await getRequests();
  console.log(initialRequests);

  return <MyRequestsClient initialRequests={initialRequests} />;
}