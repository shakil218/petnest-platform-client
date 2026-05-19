"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MapPin, ShieldCheck, Heart, CircleDollarSign } from "lucide-react";
import { Separator } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const FeaturedPets = ({ pets }) => {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isHome = pathname === "/";

  const displayedPets = isHome ? pets.slice(0, 6) : pets;

  const title = isHome ? "Featured Pets" : "All Pets";

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black text-base-content">
            {title}
          </h2>

          <p className="mt-2 text-base-content/60">
            Find your perfect companion and give them a loving home ❤️
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPets.map((pet, index) => (
            <motion.div
              key={pet?._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-56">
                <Image
                  src={pet?.imageUrl}
                  alt={pet?.name}
                  fill
                  className="object-cover"
                />

                {/* BADGES */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-orange-500 text-white font-semibold">
                    {pet?.species}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  {pet?.status === "adopted" ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-pink-500/90 text-white font-semibold">
                      Adopted
                    </span>
                  ) : (<span className="px-3 py-1 text-xs rounded-full bg-green-500 text-white font-semibold">
                    Available
                  </span>) }
                  
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-base-content">
                    {pet?.name}
                  </h3>

                  <button className="text-pink-500 hover:scale-110 transition">
                    <Heart size={18} />
                  </button>
                </div>

                <div className="mt-3 space-y-2 text-sm text-base-content/70">
                  <p>
                    {pet?.breed} • {pet?.age} years • {pet?.gender}
                  </p>

                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {pet?.location}
                  </div>

                  <div className="flex items-center gap-1">
                    <ShieldCheck size={14} />
                    {pet?.healthStatus}
                  </div>

                  <div className="flex items-center gap-1">
                    <CircleDollarSign size={14} />
                    <p className="font-bold text-orange-500">
                      ${pet?.adoptionFee}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="mt-5 flex items-center justify-between">
                  <Link
                    href={`/pets/${pet?._id}`}
                    className="btn btn-outline px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition"
                  >
                    View Details
                  </Link>
                  <Link
                    href={user ? `/pets/${pet?._id}` : "/login"}
                    disabled={pet?.status === "adopted"}
                    className="px-4 py-2 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold hover:scale-105 transition"
                  >
                    Adopt Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;
