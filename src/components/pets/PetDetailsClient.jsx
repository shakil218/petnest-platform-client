"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Heart, ShieldCheck, User, Mail, PawPrint } from "lucide-react";

const PetDetailsClient = ({ pet }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-10 "
      >
        <div className="space-y-10 border border-base-300 rounded-2xl p-6 bg-base-200 shadow-xl">
          {/* IMAGE SECTION */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-100 md:h-100 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={pet.imageUrl}
                alt={pet.petName}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* DETAILS SECTION */}
          <div className="space-y-5">
            <h1 className="text-3xl font-black text-base-content">
              {pet.petName}
            </h1>

            <p className="text-base-content/70">{pet.description}</p>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <PawPrint size={16} />
                {pet.species}
              </div>

              <div className="flex items-center gap-2">
                <Heart size={16} />
                {pet.breed}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {pet.location}
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={16} />
                {pet.healthStatus}
              </div>
            </div>

            {/* OWNER INFO */}
            <div className="bg-base-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <User size={16} />
                {pet.ownerName}
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                {pet.ownerEmail}
              </div>
            </div>

            {/* PRICE */}
            <div className="text-2xl font-bold text-orange-500">
              ${pet.adoptionFee}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-2">
              <button className="btn bg-linear-to-r from-orange-500 to-pink-500 text-white flex-1">
                Adopt Now
              </button>

              <Link href="/pets" className="btn btn-outline flex-1">
                Back to Pets
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PetDetailsClient;
