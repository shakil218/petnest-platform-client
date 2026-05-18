"use client";

import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-4xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-black text-center"
        >
          Our Story
        </motion.h2>

        <div className="mt-10 space-y-5 text-base-content/70 leading-relaxed text-center">

          <p>
            PetNest started with a simple observation — millions of pets are abandoned every year,
            while many loving families struggle to find a safe and trusted way to adopt.
          </p>

          <p>
            We realized the problem wasn’t love — it was connection. There was no modern,
            transparent platform that made adoption easy, safe, and meaningful.
          </p>

          <p>
            So we built PetNest — a digital home where pets and people can finally find each other.
            Every listing is verified, every adoption is meaningful, and every story matters.
          </p>

          <p className="font-semibold text-base-content">
            Today, PetNest continues to grow with one mission — to give every pet a second chance
            at life and every family a loyal companion.
          </p>

        </div>

      </div>
    </section>
  );
};

export default OurStory;