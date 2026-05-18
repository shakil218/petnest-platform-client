"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const Contacts = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-black">
            Contact <span className="text-orange-500">PetNest</span>
          </h1>

          <p className="mt-3 text-base-content/70">
            Have questions about adoption? We’re here to help you and your future pet 🐶
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-base-200 p-6 rounded-2xl shadow-md space-y-4"
          >
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-base-100 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-base-100 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-3 rounded-xl bg-base-100 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition"
            >
              <Send size={18} />
              Send Message
            </button>
          </motion.form>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >

            {/* INFO BOX */}
            <div className="bg-base-200 p-6 rounded-2xl shadow-md space-y-4">

              <div className="flex items-center gap-3">
                <Mail className="text-orange-500" />
                <span>support@petnest.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-pink-500" />
                <span>+880 123 456 789</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-orange-500" />
                <span>Dhaka, Bangladesh</span>
              </div>

            </div>

            {/* SOCIAL */}
            <div className="bg-base-200 p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-3">Follow Us</h3>

              <div className="flex gap-4">
                <a className="p-3 rounded-xl bg-base-100 hover:bg-orange-500 hover:text-white transition">
                  <FaFacebook />
                </a>

                <a className="p-3 rounded-xl bg-base-100 hover:bg-pink-500 hover:text-white transition">
                  <FaInstagram />
                </a>

                <a className="p-3 rounded-xl bg-base-100 hover:bg-gray-800 hover:text-white transition">
                  <FaGithub />
                </a>
              </div>
            </div>

            {/* SUPPORT NOTE */}
            <div className="bg-linear-to-r from-orange-500/10 to-pink-500/10 p-6 rounded-2xl">
              <p className="text-sm text-base-content/70">
                We usually respond within 24 hours. Your pet adoption journey matters to us ❤️
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contacts;