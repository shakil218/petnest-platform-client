"use client";

import { PawPrintIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const NavbarClient = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Pets", href: "/pets" },
    { name: "My Requests", href: "/my-requests" },
    { name: "Add Pet", href: "/add-pet" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <div className="sticky top-0 z-50 border-b border-base-200 bg-base-100/70 backdrop-blur-xl shadow-sm">

      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT - BRAND */}
        <div className="navbar-start">

          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

            {open && (
              <ul className="menu dropdown-content mt-3 w-56 rounded-xl bg-base-100 p-3 shadow-xl border border-base-200">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        isActive(link.href)
                          ? "text-orange-500 font-semibold"
                          : ""
                      }
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link
                    href="/login"
                    className="text-orange-500 font-semibold"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">

            {/* ICON */}
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-pink-500 to-orange-400 flex items-center justify-center text-white shadow-md">
              <PawPrintIcon className="w-5 h-5" />
            </div>

            {/* NAME */}
            <div className="leading-tight">
              <h1 className="text-2xl font-black bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PetNest
              </h1>

              <p className="-mt-1 text-[10px] tracking-wide text-default-500">
                Adopt • Love • Care
              </p>
            </div>

          </Link>
        </div>

        {/* CENTER - DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-2">

            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                        : "text-default-700 hover:text-pink-500"
                    }`}
                  >
                    {link.name}

                    {/* ACTIVE INDICATOR */}
                    {active && (
                      <motion.span
                        layoutId="navbar"
                        className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-pink-500"
                      />
                    )}
                  </Link>
                </li>
              );
            })}

          </ul>
        </div>

        {/* RIGHT - CTA */}
        <div className="navbar-end">

          <Link
            href="/login"
            className="btn btn-sm rounded-full bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition"
          >
            Login
          </Link>

        </div>

      </div>
    </div>
  );
};

export default NavbarClient;