import DashboardSidebar from "@/components/dashboard/DashboardSidebar";


export const metadata = {
  title: "Dashboard | PetNest",
  description: "Manage your pet adoptions, requests, and current profile listings.",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-300 flex flex-col lg:flex-row">
      
      {/* Dashboard Sidebar */}
      <DashboardSidebar />

      {/* RENDER ACTIVE ROUTES OR DASHBOARD PANELS */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto bg-base-200 border border-base-100 rounded-2xl p-6 lg:p-8 min-h-[calc(100vh-384.4px)] shadow-xs">
          {children}
        </div>
      </main>

    </div>
  );
}