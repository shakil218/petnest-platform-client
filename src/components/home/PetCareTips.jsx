"use client";

import { motion } from "framer-motion";
import { Coffee, Activity, Utensils } from "lucide-react";

const tips = [
  {
    icon: Utensils,
    title: "Balanced Diet",
    desc: "Feed your pet high-quality food with proper nutrients.",
  },
  {
    icon: Activity,
    title: "Daily Exercise",
    desc: "Keep your pets active with daily walks and playtime.",
  },
  {
    icon: Coffee,
    title: "Regular Care",
    desc: "Visit vets regularly for health checkups.",
  },
];

const PetCareTips = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-black text-center text-base-content">
          Pet Care Tips
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          {tips.map((tip, i) => {
            const Icon = tip.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-base-200 shadow-md"
              >
                <Icon className="text-pink-500 w-8 h-8" />
                <h3 className="mt-3 font-bold text-base-content">
                  {tip.title}
                </h3>
                <p className="text-sm text-base-content/70 mt-1">
                  {tip.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default PetCareTips;