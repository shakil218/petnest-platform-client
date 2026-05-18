"use client";

import {
  LogIn,
  PawPrintIcon,
  UserPlus,
  Home,
  Info,
  Heart,
  Phone,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@heroui/react";

const NavbarClient = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  //  SSR SAFE MOUNT FIX
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  //  HERO UI THEME
  const { theme, setTheme } = useTheme();

  const currentTheme = mounted ? theme : "light";

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "All Pets", href: "/pets", icon: Heart },
    { name: "Contacts", href: "/contacts", icon: Phone },
  ];

  const isActive = (href) => pathname === href;

  return (
    <div className="sticky top-0 z-50 border-b border-base-200 bg-base-100/70 backdrop-blur-xl shadow-sm">

      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT */}
        <div className="navbar-start">

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-circle"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 ml-2 lg:ml-0">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-pink-500 to-orange-400 flex items-center justify-center text-white shadow-md">
              <PawPrintIcon className="w-5 h-5" />
            </div>

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

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;

              return (
                <li key={link.href} className="relative">

                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-2 py-2 text-sm font-semibold transition ${
                      active
                        ? "text-orange-500"
                        : "text-default-700 hover:text-orange-500"
                    }`}
                  >
                    <Icon size={16} />
                    {link.name}
                  </Link>

                  {/* ACTIVE BOTTOM BORDER */}
                  {active && (
                    <motion.div
                      layoutId="active-navbar"
                      className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-linear-to-r from-orange-500 to-pink-500"
                    />
                  )}

                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-2 flex items-center">

          {/* THEME TOGGLE */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">

            {!mounted ? null : currentTheme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}

          </button>

          {/* DESKTOP BUTTONS ONLY */}
          <div className="hidden lg:flex gap-2">

            <Link
              href="/login"
              className="btn btn-sm rounded-lg font-semibold shadow-md hover:scale-105 transition"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>

            <Link
              href="/login"
              className="btn btn-sm rounded-lg bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition"
            >
              <UserPlus className="w-4 h-4" /> Get Started
            </Link>

          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-base-100 border-t border-base-200"
          >
            <div className="px-4 py-3 space-y-2">

              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      active
                        ? "text-orange-500 bg-base-200"
                        : "text-base-content hover:bg-base-200"
                    }`}
                  >
                    <Icon size={16} />
                    {link.name}

                    {active && (
                      <motion.div
                        layoutId="mobile-active-navbar"
                        className="absolute left-3 right-3 bottom-0 h-0.5 rounded-full bg-linear-to-r from-orange-500 to-pink-500"
                      />
                    )}
                  </Link>
                );
              })}

              <div className="flex gap-2 pt-2">

                <Link
                  href="/login"
                  className="btn btn-sm flex-1"
                  onClick={() => setOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                <Link
                  href="/login"
                  className="btn btn-sm flex-1 bg-linear-to-r from-orange-500 to-pink-500 text-white"
                  onClick={() => setOpen(false)}
                >
                  <UserPlus className="w-4 h-4" /> Get Started
                </Link>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NavbarClient;