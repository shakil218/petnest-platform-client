"use client";

import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">

      <div className="flex flex-col items-center gap-4">

        {/* SPINNER */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="w-16 h-16 rounded-full border-4 border-base-300 border-t-orange-500 border-r-pink-500"
        />

        {/* FLOATING ICON */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="text-orange-500"
        >
          <PawPrint size={28} />
        </motion.div>

        {/* TEXT */}
        <p className="text-base-content/70 text-sm font-medium">
          Loading PetNest...
        </p>

      </div>

    </div>
  );
}