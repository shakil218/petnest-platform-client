"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoMdHeart } from "react-icons/io";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-base-100">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-400/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 text-orange-500 text-sm font-semibold mb-4">
            🐾 Smart Pet Adoption Platform
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-base-content">
            Adopt Pets with a{" "}
            <span className="bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Modern Experience
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 text-base-content/70 text-base md:text-lg">
            PetNest helps you discover, adopt, and manage pets through a clean,
            fast and modern digital adoption system.
          </p>

          {/* CTA */}
          <div className="mt-6 flex gap-4">
            <Link
              href="/pets"
              className="btn btn-primary bg-linear-to-r from-orange-500 to-pink-500 text-white border-0 rounded-full px-6 shadow-lg hover:scale-105 transition"
            >
              Adopt Now
            </Link>

            <Link
              href="/add-pet"
              className="btn btn-outline border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full px-6 transition"
            >
              List a Pet
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          {/* BADGE 1 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex gap-1 items-center absolute top-10 left-0 md:left-40 lg:left-0 z-10
            bg-base-200 text-base-content shadow-md px-4 py-2 rounded-xl text-sm font-semibold"
          >
            <IoMdHeart className="text-pink-500" size={16} />
            1k+ Happy Adoptions
          </motion.div>

          {/* BADGE 2 */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 right-0 md:right-40 lg:right-0 z-10
            bg-base-200 text-base-content shadow-md px-4 py-2 rounded-xl text-sm font-semibold"
          >
            🐶 Verified Pets Only
          </motion.div>

          {/* MAIN IMAGE */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-75 md:w-105"
          >
            <Image
              src="https://images.unsplash.com/photo-1573435567032-ff5982925350?q=80&w=1074"
              alt="Cute pet"
              width={500}
              height={500}
              className="rounded-3xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
