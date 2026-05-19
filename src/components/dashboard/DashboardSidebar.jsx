"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  GitPullRequest, 
  PlusCircle, 
  ListOrdered, 
  LayoutDashboard,
  Menu,
  X 
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarLinks = [
    {
      name: "My Requests",
      href: "/dashboard/my-requests",
      icon: GitPullRequest,
    },
    {
      name: "Add Pet",
      href: "/dashboard/add-pet",
      icon: PlusCircle,
    },
    {
      name: "My Listings",
      href: "/dashboard/my-listings",
      icon: ListOrdered,
    },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* MOBILE SIDEBAR HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-base-200 border-b border-base-100 sticky top-16.25 z-40">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-base-content text-sm uppercase tracking-wider">
            Dashboard Menu
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="btn btn-ghost btn-sm btn-circle"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* DASHBOARD SIDEBAR PANEL */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-base-200 border-r border-base-100 pt-24 lg:pt-6 px-4 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:h-[calc(100vh-65px)] lg:sticky lg:top-16.25 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 hidden lg:block px-2">
          <h2 className="text-xs font-black text-default-400 uppercase tracking-widest">
            Control Panel
          </h2>
        </div>

        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition group ${
                  active
                    ? "bg-linear-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-500/10"
                    : "text-base-content/80 hover:bg-base-100 hover:text-orange-500"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors ${
                    active ? "text-white" : "text-base-content/40 group-hover:text-orange-500"
                  }`}
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* OVERLAY FOR OPEN MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-xs"
        />
      )}
    </>
  );
}