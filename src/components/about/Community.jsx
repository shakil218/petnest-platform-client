"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const community = [
  {
    name: "Animal Rescue Volunteers",
    role: "Saving abandoned & injured pets",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Pet Foster Families",
    role: "Providing temporary loving homes",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Veterinary Partners",
    role: "Ensuring health & medical care",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Pet Adoption Community",
    role: "Helping pets find forever homes",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=1200&auto=format&fit=crop",
  },
];

const Community = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-black text-center">
          Our Community
        </h2>

        <p className="text-center text-base-content/70 mt-2">
          People who make pet adoption possible
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {community.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-base-100 rounded-2xl overflow-hidden shadow-md"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={400}
                className="w-full h-44 object-cover"
              />

              <div className="p-4 text-center">
                <h3 className="font-bold text-base-content">
                  {item.name}
                </h3>
                <p className="text-sm text-base-content/70 mt-1">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Community;