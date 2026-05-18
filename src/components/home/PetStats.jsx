"use client";

import { motion } from "framer-motion";
import { PawPrint, Users, Heart, Home } from "lucide-react";

const stats = [
  {
    icon: PawPrint,
    value: "12,500+",
    label: "Pets Listed",
  },
  {
    icon: Heart,
    value: "8,200+",
    label: "Successful Adoptions",
  },
  {
    icon: Users,
    value: "15,000+",
    label: "Happy Users",
  },
  {
    icon: Home,
    value: "95%",
    label: "Adoption Success Rate",
  },
];

const PetStats = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-black text-center text-base-content">
          Our Impact in Numbers
        </h2>

        <p className="text-center text-base-content/70 mt-2">
          Making pet adoption easier, faster, and more trusted
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-base-100 shadow-md text-center"
              >
                <Icon className="mx-auto text-orange-500" size={28} />

                <h3 className="mt-3 text-2xl font-black text-base-content">
                  {item.value}
                </h3>

                <p className="text-sm text-base-content/70 mt-1">
                  {item.label}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default PetStats;