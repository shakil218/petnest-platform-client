"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-100 px-6">

      <div className="text-center max-w-md">

        {/* BIG ANIMATION NUMBER */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-7xl font-black bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        {/* TITLE */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mt-4 text-base-content"
        >
          Oops! Pet Not Found 🐾
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base-content/70 mt-3"
        >
          The page you’re looking for might have wandered off like a lost puppy.
        </motion.p>

        {/* ICON ANIMATION */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mt-6 text-orange-500"
        >
          <PawPrint size={40} />
        </motion.div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition"
          >
            <Home size={18} />
            Back Home
          </Link>

          <Link
            href="/pets"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-base-200 text-base-content font-semibold hover:bg-base-300 transition"
          >
            <Search size={18} />
            Browse Pets
          </Link>

        </div>

      </div>

    </section>
  );
}