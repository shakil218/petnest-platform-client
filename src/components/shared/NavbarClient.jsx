"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { Button } from "@heroui/button";

import { Avatar } from "@heroui/avatar";

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
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { authClient } from "@/lib/auth-client";

import { ThemeSwitch } from "./ThemeSwitch";
import { Spinner } from "@heroui/react";

const NavbarClient = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const navLinks = [
    { name: "Home", href: "/", icon: Home },

    { name: "About", href: "/about", icon: Info },

    { name: "All Pets", href: "/pets", icon: Heart },

    { name: "Contacts", href: "/contacts", icon: Phone },
  ];

  const isActive = (href) => pathname === href;

  return (
    <div className="sticky top-0 z-50 py-3 border-b border-base-200 bg-base-100/70 backdrop-blur-xl shadow-sm">
      <Navbar
        maxWidth="xl"
        isBordered={false}
        className="bg-transparent shadow-none px-4 max-w-7xl mx-auto"
      >
        {/* LEFT */}

        <NavbarContent justify="start">
          <div className="lg:hidden">
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onPress={() => setOpen(!open)}
              className="min-w-0 w-10 h-10"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          <NavbarBrand>
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
          </NavbarBrand>
        </NavbarContent>

        {/* CENTER */}

        <NavbarContent justify="center" className="hidden lg:flex gap-4">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            const Icon = link.icon;

            return (
              <NavbarItem key={link.href} className="relative">
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

                {active && (
                  <motion.div
                    layoutId="active-navbar"
                    className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-linear-to-r from-orange-500 to-pink-500"
                  />
                )}
              </NavbarItem>
            );
          })}
        </NavbarContent>

        {/* RIGHT */}

        <NavbarContent justify="end" className="gap-3">
          <ThemeSwitch />

          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner color="warning" />
              <span className="text-xs text-muted">Loading...</span>
            </div>
          ) : user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="border-2 border-orange-400/50 hover:border-orange-500 transition p-0.5 rounded-full">
                  <Avatar
                    src={user?.image || "/profile-placeholder.jpg"}
                    name={user?.name || "User Avatar"}
                    className="w-10 h-10"
                  />
                </button>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="User Menu"
                className="mt-3 z-50 p-2 shadow-2xl bg-white dark:bg-black border border-base-200 rounded-2xl w-65 space-y-1 text-base-content"
              >
                <DropdownItem
                  key="profile"
                  isReadOnly
                  className="px-4 py-2 border-b border-base-200/60 mb-1"
                >
                  <p className="font-bold text-xs text-default-500 uppercase tracking-wider">
                    Account
                  </p>

                  <p className="font-semibold text-sm truncate max-w-full text-base-content my-1">
                    {user?.name || "PetNest Friend"}
                  </p>

                  <p className="text-xs text-default-500">{user?.email}</p>
                </DropdownItem>

                <DropdownItem
                  key="dashboard"
                  startContent={<LayoutDashboard size={16} />}
                  className="hover:bg-orange-400/5 hover:rounded-lg hover:text-orange-400/60"
                >
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-lg hover:text-orange-500"
                  >
                    Dashboard
                  </Link>
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<LogOut size={16} />}
                  className="flex items-center gap-2 rounded-lg text-[#F87272] hover:bg-[#F87272]/10 hover:text-[#F87272]"
                  onPress={async () => await authClient.signOut()}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Button
                as={Link}
                href="/login"
                size="sm"
                radius="lg"
                variant="solid"
                className="font-semibold shadow-md hover:scale-105 transition rounded-lg"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>

              <Button
                as={Link}
                href="/register"
                size="sm"
                radius="lg"
                className="bg-linear-to-r from-orange-500 to-pink-500 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition"
              >
                <UserPlus className="w-4 h-4" />
                Get Started
              </Button>
            </div>
          )}
        </NavbarContent>
      </Navbar>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
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
                  </Link>
                );
              })}

              {!user && !isPending && (
                <div className="flex gap-2 pt-2">
                  <Button as={Link} href="/login" size="sm" className="flex-1">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>

                  <Button
                    as={Link}
                    href="/register"
                    size="sm"
                    className="flex-1 bg-linear-to-r from-orange-500 to-pink-500 text-white"
                  >
                    <UserPlus className="w-4 h-4" />
                    Get Started
                  </Button>
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
