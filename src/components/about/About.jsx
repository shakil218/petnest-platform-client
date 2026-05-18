"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative py-20 bg-base-100 overflow-hidden">

      {/* background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-400/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-400/20 blur-3xl rounded-full" />

      <div className="max-w-5xl mx-auto px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black leading-tight"
        >
          About{" "}
          <span className="bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            PetNest
          </span>
        </motion.h1>

        <p className="mt-5 text-lg text-base-content/70 max-w-2xl mx-auto">
          A modern pet adoption platform built to connect abandoned pets with loving families
          through trust, care, and technology.
        </p>

        <div className="mt-6 flex justify-center gap-3 flex-wrap text-sm">
          <span className="px-4 py-2 rounded-full bg-base-200 text-base-content">
            🐾 Trusted Adoption Platform
          </span>
          <span className="px-4 py-2 rounded-full bg-base-200 text-base-content">
            ❤️ Built with Love
          </span>
          <span className="px-4 py-2 rounded-full bg-base-200 text-base-content">
            🏡 Forever Homes
          </span>
        </div>

      </div>
    </section>
  );
};

export default About;