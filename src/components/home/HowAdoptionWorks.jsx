"use client";

import { motion } from "framer-motion";
import { Search, FileText, HandHeart, Home } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Pet",
    desc: "Browse available pets based on breed, age, and location.",
  },
  {
    icon: FileText,
    title: "Submit Request",
    desc: "Send an adoption request with your basic details.",
  },
  {
    icon: HandHeart,
    title: "Meet & Confirm",
    desc: "Meet the pet and confirm if it's the right match.",
  },
  {
    icon: Home,
    title: "Take Them Home",
    desc: "Complete adoption and welcome your new family member.",
  },
];

const HowAdoptionWorks = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-black text-center text-base-content">
          How Pet Adoption Works
        </h2>

        <p className="text-center text-base-content/70 mt-2">
          Simple 4-step process to bring home your new best friend
        </p>

        <div className="mt-12 grid md:grid-cols-4 gap-6">

          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="relative p-6 rounded-2xl bg-base-200 shadow-md text-center"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-linear-to-tr from-orange-500 to-pink-500 text-white">
                  <Icon size={20} />
                </div>

                <h3 className="mt-4 font-bold text-base-content">
                  {step.title}
                </h3>

                <p className="text-sm text-base-content/70 mt-2">
                  {step.desc}
                </p>

                <span className="absolute top-3 right-3 text-xs font-bold text-orange-500">
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default HowAdoptionWorks;