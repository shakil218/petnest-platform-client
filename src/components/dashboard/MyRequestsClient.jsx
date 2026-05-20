"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";
import { Calendar, PawPrint, Eye, XCircle } from "lucide-react";

export default function MyRequestsClient({ initialRequests }) {
  const [requests, setRequests] = useState(initialRequests);

  // DELETE REQUEST
  const handleCancel = async (id) => {
    const confirmDelete = await new Promise((resolve) => {
      const toastId = toast(
        ({ closeToast }) => (
          <div className="space-y-2">
            <p className="text-sm font-medium text-base-content">
              Are you sure you want to cancel this request?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  toast.dismiss(toastId);
                  resolve(true);
                }}
                className="px-3 py-1 text-xs bg-red-500 text-white rounded"
              >
                Yes
              </button>

              <button
                onClick={() => {
                  toast.dismiss(toastId);
                  resolve(false);
                }}
                className="px-3 py-1 text-xs bg-base-300 text-base-content rounded"
              >
                No
              </button>
            </div>
          </div>
        ),
        {
          autoClose: false,
          closeOnClick: false,
        },
      );
    });

    if (!confirmDelete) return;

    const {data:tokenData}= await authClient.token();

    try {
      const res = await fetch(`http://localhost:5000/adoption-requests/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) throw new Error();

      setRequests((prev) => prev.filter((r) => r._id !== id));

      toast.success("Request cancelled");
    } catch (error) {
      toast.error("Failed to cancel request");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 animate-fadeIn">
      {/* HEADER */}
      <div className="border-b border-base-200 pb-4">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <PawPrint className="text-orange-500" />
          My Adoption Requests
        </h1>
        <p className="text-sm text-base-content/60 mt-1">
          Track all your pet adoption requests and their current status
        </p>
      </div>

      {/* EMPTY STATE */}
      {requests.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-2xl border border-dashed">
          <PawPrint className="mx-auto text-orange-400 w-10 h-10 mb-2" />
          <p className="text-sm text-base-content/60">
            No adoption requests found
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-base-100 border border-base-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold">{req.petName}</h2>

                  <p className="text-xs text-base-content/50 mt-1">
                    Adoption Request
                  </p>
                </div>

                {/* STATUS BADGE */}
                <span
                  className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${
                    req.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : req.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              {/* INFO */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-base-content/70">
                  <Calendar size={14} />
                  <span>Request Date: {new Date(req.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-base-content/70">
                  <Calendar size={14} />
                  <span>Pickup Date: {req.pickupDate}</span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-5">
                <Link href={`/pets/${req.petId}`}>
                  <Button
                    size="sm"
                    className="bg-base-200 hover:bg-base-300 text-base-content border border-base-300 font-bold flex items-center gap-1"
                  >
                    <Eye size={14} />
                    View Pet
                  </Button>
                </Link>

                <Button
                  size="sm"
                  onPress={() => handleCancel(req._id)}
                  className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-bold"
                >
                  <XCircle size={14} className="mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
