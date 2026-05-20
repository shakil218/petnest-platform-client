import MyRequestsClient from "@/components/dashboard/MyRequestsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Adoption Requests - Pet Adoption Platform",
  description: "View and manage your adoption requests on our pet adoption platform. Keep track of the pets you've expressed interest in and stay updated on the status of your requests.",
};

export const dynamic = "force-dynamic";

async function getRequests() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) return [];

    const email = session.user.email;

    const {token} = await auth.api.getToken({
      headers: await headers(),
  });
    const res = await fetch(
      `http://localhost:5000/my-requests?email=${email}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
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