"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stories = [
  {
    name: "Sarah & Bruno",
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBldHN8ZW58MHx8MHx8fDA%3D",
    text: "Bruno changed my life. He is now part of our family and brings joy every single day.",
  },
  {
    name: "John & Max",
    image:
      "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBldHN8ZW58MHx8MHx8fDA%3D",
    text: "Adopting Max was the best decision ever. He makes every moment happier.",
  },
  {
    name: "Emily & Luna",
    image:
      "https://plus.unsplash.com/premium_photo-1661503280224-a86d7ad2a574?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHBldHN8ZW58MHx8MHx8fDA%3D",
    text: "Luna rescued me as much as I rescued her. She’s my emotional support angel.",
  },
  {
    name: "David & Charlie",
    image:
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Charlie is full of energy and love. Our home feels complete now.",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-black text-center text-base-content">
          Success Stories
        </h2>

        <p className="text-center text-base-content/70 mt-2 text-sm">
          Real people. Real pets. Real happiness.
        </p>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stories.map((story, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-base-100 rounded-2xl shadow-md overflow-hidden"
            >
              <Image
                src={story.image}
                alt={story.name}
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="font-bold text-base-content text-lg">
                  {story.name}
                </h3>

                <p className="text-base-content/70 text-sm mt-2 leading-relaxed">
                  {story.text}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default SuccessStories;