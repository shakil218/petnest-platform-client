"use client";

import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, PawPrint } from "lucide-react";

const mission = [
  {
    icon: HeartHandshake,
    title: "Connect Lives",
    desc: "We connect abandoned pets with caring families.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Adoption",
    desc: "Every pet is verified and health-checked before listing.",
  },
  {
    icon: PawPrint,
    title: "Animal Welfare",
    desc: "We ensure every pet gets love, care, and dignity.",
  },
];

const OurMission = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-black text-center">Our Mission</h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          {mission.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-base-100 shadow-md text-center"
              >
                <Icon className="mx-auto text-orange-500" size={30} />

                <h3 className="mt-3 font-bold">{item.title}</h3>
                <p className="text-sm text-base-content/70 mt-2">
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

export default OurMission;