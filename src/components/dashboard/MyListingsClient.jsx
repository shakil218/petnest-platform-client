"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";

import {
  Heart,
  Layers,
  CheckCircle,
  Eye,
  Pencil,
  Trash2,
  GitPullRequest,
  X,
  User,
  Mail,
  Calendar,
  MapPin,
} from "lucide-react";

export default function MyListingsClient({ initialPets }) {
 
  const safePets = useMemo(() => {
    if (Array.isArray(initialPets)) return initialPets;

    if (initialPets?.pets && Array.isArray(initialPets.pets)) {
      return initialPets.pets;
    }

    return [];
  }, [initialPets]);

  
  // STATES
  
  const [pets, setPets] = useState(safePets);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeRequests, setActiveRequests] = useState([]);

  const [selectedPetId, setSelectedPetId] = useState(null);

  const [loadingRequests, setLoadingRequests] = useState(false);

  const [requestsByPetId, setRequestsByPetId] = useState({});

  
  // STATS

  const totalListings = pets.length;

  const availableCount = pets.filter((p) => p.status !== "adopted").length;

  const adoptedCount = pets.filter((p) => p.status === "adopted").length;

  
  // OPEN REQUEST MODAL
  
  const openRequestsModal = async (petId) => {
    try {
      setLoadingRequests(true);

      const res = await fetch(
        `http://localhost:5000/adoption-requests/pet/${petId}`,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      setSelectedPetId(petId);

      setActiveRequests(Array.isArray(data) ? data : []);

      setRequestsByPetId((prev) => ({
        ...prev,
        [petId]: Array.isArray(data) ? data : [],
      }));

      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load requests");
    } finally {
      setLoadingRequests(false);
    }
  };

 
  // UPDATE REQUEST STATUS
  
  const handleUpdateRequestStatus = async (requestId, nextStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/adoption-requests/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
            petId: selectedPetId,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      // UPDATE ACTIVE REQUESTS
      setActiveRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: nextStatus } : req,
        ),
      );

      // UPDATE PET REQUESTS
      setRequestsByPetId((prev) => ({
        ...prev,
        [selectedPetId]: (prev[selectedPetId] || []).map((req) =>
          req._id === requestId ? { ...req, status: nextStatus } : req,
        ),
      }));

      // UPDATE PET STATUS
      if (nextStatus === "approved") {
        setPets((prev) =>
          prev.map((pet) =>
            pet._id === selectedPetId
              ? {
                  ...pet,
                  status: "adopted",
                }
              : pet,
          ),
        );

        toast.success("Request approved successfully 🎉");
      } else {
        toast.info("Request rejected");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update request");
    }
  };

  
  // DELETE PET
  
  const handleDeletePet = async (petId) => {
    const confirmDelete = await new Promise((resolve) => {
      const id = toast(
        ({ closeToast }) => (
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Are you sure you want to permanently delete this pet?
            </p>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  toast.dismiss(id);
                  resolve(true);
                }}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
              >
                Yes
              </button>

              <button
                onClick={() => {
                  toast.dismiss(id);
                  resolve(false);
                }}
                className="px-2 py-1 text-xs bg-gray-300 rounded"
              >
                Cancel
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

    try {
      const res = await fetch(`http://localhost:5000/pets/${petId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setPets((prev) => prev.filter((pet) => pet._id !== petId));

      setRequestsByPetId((prev) => {
        const copy = { ...prev };
        delete copy[petId];
        return copy;
      });

      toast.success("Pet deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete pet");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-base-content p-2">
      {/* HEADER */}
      <div className="border-b border-base-100 pb-4">
        <h1 className="text-2xl font-black tracking-tight">
          My Active Listings Dashboard
        </h1>

        <p className="text-xs text-base-content/60 mt-1">
          Monitor your posted adoption cards, manage incoming applicant data
          sheets, and finalize verification paths.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-base-100 rounded-2xl border border-base-100/50 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider block">
              Total Listings
            </span>

            <span className="text-2xl font-black">{totalListings} Entries</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-500">
            <Layers size={20} />
          </div>
        </div>

        <div className="p-5 bg-base-100 rounded-2xl border border-base-100/50 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider block">
              Looking for Home
            </span>

            <span className="text-2xl font-black text-orange-500">
              {availableCount} Available
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-orange-500/10 text-orange-500">
            <Heart size={20} />
          </div>
        </div>

        <div className="p-5 bg-base-100 rounded-2xl border border-base-100/50 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider block">
              Found Families
            </span>

            <span className="text-2xl font-black text-pink-500">
              {adoptedCount} Adopted
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-pink-500/10 text-pink-500">
            <CheckCircle size={20} />
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {pets.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-2xl border border-dashed border-base-100/60">
          <p className="text-sm text-base-content/50 font-medium">
            You have not submitted any active listings yet.
          </p>

          <Link
            href="/dashboard/add-pet"
            className="mt-3  btn btn-sm bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg border-0"
          >
            Post a Pet Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => {
            const petRequests = requestsByPetId[pet._id] || [];

            return (
              <div
                key={pet._id}
                className="bg-base-100 border border-base-100/50 rounded-2xl overflow-hidden flex flex-col group hover:border-orange-500/20 transition-all shadow-xs"
              >
                {/* IMAGE */}
                <div className="relative h-48 w-full bg-base-300 overflow-hidden">
                  <Image
                    src={pet.imageUrl}
                    alt={pet.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  <span
                    className={`absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-xs ${
                      pet.status === "adopted"
                        ? "bg-pink-500 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {pet.status || "available"}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{pet.name}</h3>

                      <p className="text-[11px] text-base-content/50 mt-1">
                        {pet.species} • {pet.breed}
                      </p>

                      <p className="text-[11px] text-base-content/50 flex items-center gap-1 mt-1">
                        <MapPin size={12} />
                        {pet.location}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-orange-500">
                        {Number(pet.adoptionFee) === 0
                          ? "Free Adoption"
                          : `$${Number(pet.adoptionFee).toFixed(2)} USD`}
                      </p>

                      <p className="text-[11px] text-base-content/50 mt-1">
                        {petRequests.length}{" "}
                        {petRequests.length === 1 ? "Request" : "Requests"}
                      </p>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="space-y-2 pt-2">
                    <Button
                      onPress={() => openRequestsModal(pet._id)}
                      className="w-full btn btn-sm bg-base-300 text-base-content hover:text-orange-500 hover:bg-base-200 border-0 rounded-xl font-bold gap-2 text-xs h-9"
                    >
                      <GitPullRequest size={14} />

                      <span>View Requests</span>
                    </Button>

                    <div className="grid grid-cols-3 gap-1.5">
                      <Link
                        href={`/pets/${pet._id}`}
                        className="btn btn-sm bg-base-200 hover:bg-base-300 border-0 rounded-xl font-bold flex items-center justify-center text-xs h-9"
                      >
                        <Eye size={14} />
                      </Link>

                      <Link
                        href={`/dashboard/my-listings/update/${pet._id}`}
                        className="btn btn-sm bg-base-200 hover:bg-base-300 border-0 rounded-xl font-bold flex items-center justify-center text-xs h-9"
                      >
                        <Pencil size={14} />
                      </Link>

                      <Button
                        onPress={() => handleDeletePet(pet._id)}
                        className="btn btn-sm bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border-0 rounded-xl font-bold flex items-center justify-center min-w-0 h-9"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-base-200 border border-base-100 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl animate-scaleUp">
            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-base-100 bg-base-100">
              <div className="flex items-center gap-2">
                <GitPullRequest size={18} className="text-orange-500" />

                <h2 className="text-md font-black tracking-tight">
                  Active Inbound Adoption Requests
                </h2>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-300 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 bg-base-200">
              {loadingRequests ? (
                <div className="text-center py-8 text-sm text-base-content/50 font-medium">
                  Loading requests...
                </div>
              ) : activeRequests.length === 0 ? (
                <div className="text-center py-8 text-sm text-base-content/50 font-medium">
                  No adoption requests found.
                </div>
              ) : (
                activeRequests.map((req) => (
                  <div
                    key={req._id}
                    className="p-4 bg-base-100 border border-base-100/60 rounded-xl space-y-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-base-100/40 pb-3">
                      <div>
                        <h3 className="text-sm font-black tracking-wide text-base-content">
                          {req.petName}
                        </h3>

                        <p className="text-[11px] text-base-content/50 mt-1">
                          Adoption Application
                        </p>
                      </div>

                      <span
                        className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md ${
                          req.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : req.status === "rejected"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    {/* USER INFO */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-center gap-2 font-bold">
                        <div className="p-2 rounded-lg bg-base-200 text-orange-500">
                          <User size={14} />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase text-base-content/40 font-black tracking-wider">
                            Applicant
                          </p>

                          <p className="text-sm text-base-content">
                            {req.adopterName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 truncate">
                        <div className="p-2 rounded-lg bg-base-200 text-blue-500">
                          <Mail size={14} />
                        </div>

                        <div className="truncate">
                          <p className="text-[10px] uppercase text-base-content/40 font-black tracking-wider">
                            Email
                          </p>

                          <p className="text-sm text-base-content/70 truncate">
                            {req.adopterEmail}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-base-200 text-pink-500">
                          <Calendar size={14} />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase text-base-content/40 font-black tracking-wider">
                            Pickup Date
                          </p>

                          <p className="text-sm font-bold text-orange-500">
                            {req.pickupDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="rounded-xl bg-base-200 border border-base-100/40 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-base-content/40 font-black mb-1">
                        Message
                      </p>

                      <p className="text-sm leading-relaxed text-base-content/70">
                        {req.message}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between pt-2 border-t border-base-100/30">
                      <div>
                        <span
                          className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-md ${
                            req.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : req.status === "rejected"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          Status: {req.status}
                        </span>
                      </div>

                      {req.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onPress={() =>
                              handleUpdateRequestStatus(req._id, "rejected")
                            }
                            className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-bold text-xs rounded-lg px-3 min-w-0 h-8"
                          >
                            Reject
                          </Button>

                          <Button
                            size="sm"
                            onPress={() =>
                              handleUpdateRequestStatus(req._id, "approved")
                            }
                            className="bg-emerald-500 text-white font-bold text-xs rounded-lg px-3 min-w-0 h-8"
                          >
                            Approve
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-base-content/40 italic select-none">
                          Decision Locked
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
