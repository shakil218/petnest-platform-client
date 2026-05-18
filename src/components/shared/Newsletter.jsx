"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-base-100 shadow-xl p-10 text-center"
        >
          {/* BACKGROUND GLOW */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-400/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-400/20 blur-3xl rounded-full" />

          {/* ICON */}
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Mail size={26} />
            </div>
          </div>

          {/* TITLE */}
          <h2 className="mt-5 text-3xl font-black text-base-content">
            Stay Updated with{" "}
            <span className="bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              PetNest
            </span>{" "}
            🐾
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-2 text-base-content/70 text-sm">
            Get latest pet adoption updates, success stories, and new pets
            directly in your inbox.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full sm:w-80 px-4 py-3 rounded-xl bg-base-200 text-base-content outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-orange-500 to-pink-500 shadow-md hover:scale-105 transition"
            >
              Subscribe
            </button>
          </form>

          {/* FOOT NOTE */}
          <p className="mt-4 text-xs text-base-content/50">
            No spam. Only pet love updates ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
