"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  PawPrint,
  Sparkles,
  Calendar,
  User,
  MapPin,
  DollarSign,
  HeartPulse,
  Syringe,
  AlertTriangle,
  Mail,
  Heart,
  Pencil,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const PetDetailsClient = ({ pet }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // Check if the current logged-in user is the creator of this pet listing
  const isOwner = pet.ownerEmail === user?.email;

  // Form State Management
  const [formData, setFormData] = useState({
    pickupDate: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOwner) return;

    const submissionData = {
      petId: pet._id,
      petName: pet.petName,
      buyerName: currentUser?.name,
      buyerEmail: currentUser?.email,
      preferredPickupDate: formData.pickupDate,
      message: formData.message,
    };

    console.log("Adoption Request Submitted:", submissionData);
  };

  return (
    <section className="min-h-screen bg-base-300 text-base-content p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP NAVIGATION */}
        <div className="flex items-center justify-between">
          <Link
            href="/pets"
            className="flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content transition"
          >
            <ArrowLeft size={16} />
            <span>Back to All Pets</span>
          </Link>
        </div>

        {/* MAIN RESPONSIVE GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {/* LEFT COLUMN: PET DETAILS (Takes 2 columns on desktop) */}
          <div className="md:col-span-3 space-y-6">
            {/* HERO IMAGE CONTAINER */}
            <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden shadow-xl border border-base-100">
              <Image
                src={pet?.imageUrl}
                alt={pet?.petName}
                fill
                priority
                className="object-cover"
              />
              <span className="absolute top-4 right-4 badge badge-success text-white font-semibold px-3 py-3 rounded-full text-xs z-10">
                {pet?.status || "Available"}
              </span>
            </div>

            {/* TITLE AND PRICE HEADER SPLIT */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-black tracking-tight text-base-content">
                  {pet?.petName}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-error/10 text-error text-xs px-3 py-1 rounded-full font-medium">
                    {pet?.species}
                  </span>
                  <span className="bg-base-100 text-base-content/80 text-xs px-3 py-1 rounded-full font-medium">
                    {pet?.breed}
                  </span>
                  <span className="bg-base-100 text-base-content/80 text-xs px-3 py-1 rounded-full font-medium">
                    {pet?.gender || "Male"}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs text-base-content/50 uppercase tracking-wider font-semibold">
                  Adoption Fee
                </p>
                <p className="text-3xl font-black text-error">
                  ${pet?.adoptionFee}
                </p>
              </div>
            </div>

            {/* DETAILED SPECIFICATIONS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Species */}
              <div className="bg-base-200 border border-base-100 p-4 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="text-error">
                  <PawPrint size={20} />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 font-medium">
                    Species
                  </p>
                  <p className="text-sm font-bold text-base-content">
                    {pet?.species}
                  </p>
                </div>
              </div>

              {/* Breed */}
              <div className="bg-base-200 border border-base-100 p-4 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="text-error">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 font-medium">
                    Breed
                  </p>
                  <p className="text-sm font-bold text-base-content">
                    {pet?.breed}
                  </p>
                </div>
              </div>

              {/* Age */}
              <div className="bg-base-200 border border-base-100 p-4 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="text-error">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 font-medium">
                    Age
                  </p>
                  <p className="text-sm font-bold text-base-content">
                    {pet?.age || "2 years"}
                  </p>
                </div>
              </div>

              {/* Gender */}
              <div className="bg-base-200 border border-base-100 p-4 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="text-error">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 font-medium">
                    Gender
                  </p>
                  <p className="text-sm font-bold text-base-content">
                    {pet?.gender || "Male"}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-base-200 border border-base-100 p-4 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="text-error">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 font-medium">
                    Location
                  </p>
                  <p className="text-sm font-bold text-base-content">
                    {pet?.location}
                  </p>
                </div>
              </div>

              {/* Adoption Fee Box */}
              <div className="bg-base-200 border border-base-100 p-4 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="text-error">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 font-medium">
                    Adoption Fee
                  </p>
                  <p className="text-sm font-bold text-base-content">
                    ${pet?.adoptionFee}
                  </p>
                </div>
              </div>

              {/* Health Status */}
              <div className="bg-base-200 border border-base-100 p-4 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="text-error">
                  <HeartPulse size={20} />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 font-medium">
                    Health Status
                  </p>
                  <p className="text-sm font-bold text-base-content">
                    {pet?.healthStatus || "Excellent"}
                  </p>
                </div>
              </div>

              {/* Vaccinated */}
              <div className="bg-base-200 border border-base-100 p-4 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="text-error">
                  <Syringe size={20} />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 font-medium">
                    Vaccinated
                  </p>
                  <p className="text-sm font-bold text-base-content">
                    {pet?.vaccinated || "Yes"}
                  </p>
                </div>
              </div>
            </div>

            {/* ABOUT CONTENT DESCRIPTION */}
            <div className="space-y-2 pt-2">
              <h2 className="text-xl font-bold text-base-content">
                About {pet?.petName}
              </h2>
              <p className="text-sm text-base-content/70 leading-relaxed font-normal">
                {pet?.description}
              </p>
            </div>

            {isOwner && (
              <div className="w-full rounded-xl border border-[#783A0E] bg-[#160D05] p-4">
                {/* Icon & Heading text */}
                <div className="flex items-center gap-2 text-[#E39C25]">
                  <PawPrint size={18} />
                  <span className="text-sm font-semibold tracking-wide">
                    You own this listing
                  </span>
                </div>

                {/* Edit Pet Button */}
                <div className="mt-3">
                  <button className="rounded-xl bg-[#211C18] px-4 py-1.5 text-xs font-medium text-[#E0DCD9] border border-white/2 shadow-xs transition-all hover:bg-[#2F2721] active:scale-95">
                    Edit Pet
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2">
            {isOwner ? (
              /* OWNER ACCESS WARNING DISPLAY */
              <div className="bg-base-200 border border-base-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
                <div className="text-warning bg-warning/10 p-4 rounded-full">
                  <AlertTriangle size={40} />
                </div>
                <h3 className="text-xl font-black text-base-content">
                  This is your listing
                </h3>
                <p className="text-sm text-base-content/60 leading-relaxed">
                  You cannot request adoption for your own pet listing.
                </p>
              </div>
            ) : (
              /* IMAGE 2: BUYER REQUEST TO ADOPT FORM */
              <div className="bg-base-200 border border-base-100 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-base-100 pb-3">
                  <Heart className="text-rose-500 fill-rose-500" size={18} />
                  <h3 className="text-lg font-bold text-base-content">
                    Request to Adopt {pet.petName}
                  </h3>
                </div>
                <p className="text-xs text-base-content/60">
                  Fill out this form and the owner will review your request.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Pet Name (Read-only) */}
                  <div className="form-control w-full">
                    <label className="label py-1 text-xs font-semibold text-base-content/70">
                      Pet Name
                    </label>
                    <input
                      type="text"
                      value={pet.petName}
                      disabled
                      className="input input-bordered w-full bg-base-300 border-base-100 text-sm font-medium opacity-80"
                    />
                  </div>

                  {/* User Name (Read-only) */}
                  <div className="form-control w-full">
                    <label className="label py-1 text-xs font-semibold text-base-content/70">
                      Your Name
                    </label>
                    <div className="relative flex items-center">
                      <User
                        className="absolute left-4 text-base-content/40"
                        size={16}
                      />
                      <input
                        type="text"
                        value={user?.name || "Anonymous User"}
                        disabled
                        className="input input-bordered w-full pl-11 bg-base-300 border-base-100 text-sm opacity-80"
                      />
                    </div>
                  </div>

                  {/* User Email (Read-only) */}
                  <div className="form-control w-full">
                    <label className="label py-1 text-xs font-semibold text-base-content/70">
                      Your Email
                    </label>
                    <div className="relative flex items-center">
                      <Mail
                        className="absolute left-4 text-base-content/40"
                        size={16}
                      />
                      <input
                        type="email"
                        value={user?.email || "user@example.com"}
                        disabled
                        className="input input-bordered w-full pl-11 bg-base-300 border-base-100 text-sm opacity-80"
                      />
                    </div>
                  </div>

                  {/* Preferred Pickup Date */}
                  <div className="form-control w-full">
                    <label className="label py-1 text-xs font-semibold text-base-content/70">
                      Preferred Pickup Date
                    </label>
                    <div className="relative flex items-center">
                      <Calendar
                        className="absolute left-4 text-base-content/40 pointer-events-none"
                        size={16}
                      />
                      <input
                        type="date"
                        name="pickupDate"
                        required
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        className="input input-bordered w-full pl-11 bg-base-300 border-base-100 text-sm text-base-content"
                      />
                    </div>
                  </div>

                  {/* Message to Owner */}
                  <div className="form-control w-full">
                    <label className="label py-1 text-xs font-semibold text-base-content/70">
                      Message to Owner
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={`Tell the owner why you'd be a great match for ${pet?.petName}...`}
                      className="textarea textarea-bordered w-full bg-base-300 border-base-100 text-sm text-base-content resize-none leading-relaxed"
                    />
                  </div>

                  {/* Gradient Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full btn border-0 font-bold bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl transition hover:opacity-90 normal-case"
                    >
                      Adopt {pet?.petName} 🐾
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetDetailsClient;
