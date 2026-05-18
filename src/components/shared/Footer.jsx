"use client";

import Link from "next/link";
import {
  PawPrintIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-pink-500 to-orange-400 flex items-center justify-center text-white shadow-md">
              <PawPrintIcon className="w-5 h-5" />
            </div>

            <h2 className="text-xl font-black bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              PetNest
            </h2>
          </div>

          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            Find your perfect companion. Adopt, love, and give pets a better
            life.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              support@petnest.com
            </li>

            <li className="flex items-center gap-2">
              <Phone size={16} />
              +880 123 456 789
            </li>

            <li className="flex items-center gap-2">
              <MapPin size={16} />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-3">
            <Link
              href="#"
              className="p-2 rounded-full bg-base-100 hover:bg-orange-500 hover:text-white transition"
            >
              <FaFacebook size={18} />
            </Link>

            <Link
              href="#"
              className="p-2 rounded-full bg-base-100 hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="#"
              className="p-2 rounded-full bg-base-100 hover:bg-gray-800 hover:text-white transition"
            >
              <BsTwitterX size={18} />
            </Link>

            <Link
              href="#"
              className="p-2 rounded-full bg-base-100 hover:bg-gray-800 hover:text-white transition"
            >
              <FaGithub size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-base-300 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-orange-500">PetNest</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
