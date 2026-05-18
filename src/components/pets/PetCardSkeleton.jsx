"use client";

const PetCardSkeleton = () => {
  return (
    <div className="bg-base-200 rounded-2xl overflow-hidden shadow-md animate-pulse">
      {/* IMAGE */}
      <div className="h-56 bg-base-300" />

      {/* CONTENT */}
      <div className="p-5 space-y-4">
        <div className="h-5 w-2/3 bg-base-300 rounded" />

        <div className="space-y-2">
          <div className="h-3 w-full bg-base-300 rounded" />
          <div className="h-3 w-5/6 bg-base-300 rounded" />
          <div className="h-3 w-4/6 bg-base-300 rounded" />
        </div>

        <div className="flex justify-between items-center pt-3">
          <div className="h-5 w-16 bg-base-300 rounded" />
          <div className="h-8 w-24 bg-base-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default PetCardSkeleton;