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
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const NavbarClient = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

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

          {/* DESKTOP/MOBILE AUTH SYSTEM CONDITIONAL SECTION */}
          <div className="flex gap-2">

            {isPending ? (
              <div className="flex items-center gap-2 text-gray-400">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            ) : user ? (
              /* USER AVATAR WITH DROPDOWN MENU */
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-orange-400/50 hover:border-orange-500 transition p-0.5">
                  <div className="w-10 rounded-full overflow-hidden relative">
                    <Image
                      src={user?.image || "/profile-placeholder.jpg"}
                      alt={user?.name || "User Avatar"}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-2xl bg-base-100 border border-base-200 rounded-2xl w-65 space-y-1 text-base-content"
                >
                  <li className="px-4 py-2 border-b border-base-200/60 mb-1">
                    <p className="font-bold text-xs text-default-500 uppercase tracking-wider">Account</p>
                    <p className="font-semibold text-sm truncate max-w-full text-base-content">{user?.name || "PetNest Friend"}</p>
                    <p className="text-xs text-default-500">{user?.email}</p>
                  </li>
                  <li>
                    <Link href="/dashboard" className="flex items-center gap-2 py-2 rounded-xl hover:text-orange-500">
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={async () => await authClient.signOut()}
                      className="flex items-center gap-2 py-2 rounded-xl text-error hover:bg-error/10 hover:text-error"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              /* LOGIN & SIGNUP ACCENT CONTROLS */
              <div className="hidden lg:flex gap-2">
                <Link
                  href="/login"
                  className="btn btn-sm rounded-lg font-semibold shadow-md hover:scale-105 transition"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>

                <Link
                  href="/register"
                  className="btn btn-sm rounded-lg bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition"
                >
                  <UserPlus className="w-4 h-4" /> Get Started
                </Link>
              </div>
            )}

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

              {/* HIDE ACTION ROW CORES IF PROFILE AVATAR DROPDOWN HANDLES VISIBILITY */}
              {!user && !isPending && (
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
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NavbarClient;