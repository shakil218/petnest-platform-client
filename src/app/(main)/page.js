import Banner from "@/components/home/Banner";
import PetCareTips from "@/components/home/PetCareTips";
import SuccessStories from "@/components/home/SuccessStories";
import WhyAdopt from "@/components/home/WhyAdopt";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
    </div>
  );
}
