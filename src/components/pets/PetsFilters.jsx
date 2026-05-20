"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function PetsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1️⃣ Sync state initialization with current URL conditions
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedSpecies, setSelectedSpecies] = useState(() => {
    const speciesParam = searchParams.get("species");
    return speciesParam ? speciesParam.split(",") : [];
  });

  // 2️⃣ Compile conditions and execute side-effect updates to URL params
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams();
      
      if (search.trim()) params.set("search", search.trim());
      if (selectedSpecies.length > 0) params.set("species", selectedSpecies.join(","));

      router.push(`/pets?${params.toString()}`);
    }, 450); // Debounce writing to URL to optimize API collection pipeline

    return () => clearTimeout(delayDebounce);
  }, [search, selectedSpecies, router]);

  const toggleSpecies = (speciesValue) => {
    setSelectedSpecies((prev) =>
      prev.includes(speciesValue)
        ? prev.filter((item) => item !== speciesValue)
        : [...prev, speciesValue]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-base-200 p-4 rounded-2xl border border-base-100 shadow-xs">
      {/* Name Text Fields Matcher */}
      <div className="relative col-span-1">
        <Search className="absolute left-3 top-3 text-base-content/40 w-4 h-4" />
        <input
          type="text"
          placeholder="Search companion by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered pl-10 w-full bg-base-300 text-sm focus:outline-hidden text-base-content border-base-100 rounded-xl"
        />
      </div>

      {/* Target Species Checkbox Set ($in engine hook) */}
      <div className="md:col-span-2 flex flex-wrap gap-4 items-center md:justify-end overflow-x-auto">
        <span className="text-xs font-bold text-base-content/60 uppercase flex items-center gap-1">
          <SlidersHorizontal size={13} className="text-orange-500" /> Filter Species:
        </span>
        {["dog", "cat", "bird", "rabbit"].map((sp) => (
          <label key={sp} className="label cursor-pointer gap-2 text-xs font-semibold text-base-content/80 capitalize">
            <input
              type="checkbox"
              checked={selectedSpecies.includes(sp)}
              onChange={() => toggleSpecies(sp)}
              className="checkbox checkbox-xs rounded-md border-base-content/30 checkbox-primary"
            />
            {sp}
          </label>
        ))}
      </div>
    </div>
  );
}