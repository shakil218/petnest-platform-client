import PetsGridSkeleton from "@/components/pets/PetsGridSkeleton";


export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="h-10 w-40 bg-base-300 rounded mx-auto animate-pulse" />
      <PetsGridSkeleton count={9} />
    </div>
  );
}