"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { 
  GitPullRequest, 
  PlusCircle, 
  ListOrdered, 
  ArrowRight 
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const quickStats = [
    {
      title: "Adoption Requests",
      value: "2 Active",
      description: "Pending sheltering approval",
      icon: GitPullRequest,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "My Active Listings",
      value: "4 Posted",
      description: "Pets currently looking for a home",
      icon: ListOrdered,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  const actionCards = [
    {
      title: "Need to rehome a pet?",
      description: "List a new rescue pet on our platform to connect with loving local families instantly.",
      buttonText: "Create a Listing",
      href: "/dashboard/add-pet",
      icon: PlusCircle,
      gradient: "from-orange-500 to-pink-500",
    },
    {
      title: "Track adoption statuses",
      description: "Review current open applications, background checks, or message prospective adopters.",
      buttonText: "View Requests",
      href: "/dashboard/my-requests",
      icon: GitPullRequest,
      gradient: "from-slate-700 to-slate-900",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* GREETING BANNER */}
      <div className="border-b border-base-100 pb-4">
        <h1 className="text-3xl font-black tracking-tight text-base-content">
          Hello, <span className="text-orange-500">{user?.name || "PetNest Friend"}</span>! 🐾
        </h1>
        <p className="text-sm text-base-content/60 mt-1">
          Welcome back to your command center. Manage your pet posts and adoption paths below.
        </p>
      </div>

      {/* QUICK STATS COUNTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex items-center justify-between p-6 bg-base-100 border border-base-100/50 rounded-2xl shadow-xs">
              <div className="space-y-1">
                <span className="text-xs font-bold text-base-content/50 uppercase tracking-wider block">
                  {stat.title}
                </span>
                <span className="text-2xl font-black text-base-content block">
                  {stat.value}
                </span>
                <span className="text-xs text-base-content/40 block">
                  {stat.description}
                </span>
              </div>
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTION REDIRECTS CARDS PANEL */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-default-400 uppercase tracking-widest px-1">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col justify-between p-6 rounded-2xl bg-base-100 border border-base-100/50 hover:border-orange-500/20 transition duration-200 group shadow-xs"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-base-content/70 group-hover:text-orange-500 transition">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-base-content">
                    {card.title}
                  </h4>
                  <p className="text-xs text-base-content/60 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    href={card.href}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-linear-to-r ${card.gradient} shadow-md transition hover:opacity-90 active:scale-95`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}