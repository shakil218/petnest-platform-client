"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Home, Smile } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Save a Life",
    desc: "Give a homeless pet a second chance at happiness.",
  },
  {
    icon: Shield,
    title: "Verified Pets",
    desc: "All pets are health-checked and verified before listing.",
  },
  {
    icon: Home,
    title: "Safe Adoption",
    desc: "Secure and transparent adoption process.",
  },
  {
    icon: Smile,
    title: "Pure Happiness",
    desc: "Experience unconditional love from your new companion.",
  },
];

const WhyAdopt = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-center text-base-content"
        >
          Why Adopt Pets?
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {reasons.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-base-200 shadow-md"
              >
                <Icon className="text-orange-500 w-8 h-8" />
                <h3 className="mt-3 font-bold text-base-content">
                  {item.title}
                </h3>
                <p className="text-sm text-base-content/70 mt-1">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;