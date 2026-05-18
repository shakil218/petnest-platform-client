import Banner from "@/components/home/Banner";
import HowAdoptionWorks from "@/components/home/HowAdoptionWorks";
import PetCareTips from "@/components/home/PetCareTips";
import PetStats from "@/components/home/PetStats";
import SuccessStories from "@/components/home/SuccessStories";
import WhyAdopt from "@/components/home/WhyAdopt";
import Newsletter from "@/components/shared/Newsletter";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
      <HowAdoptionWorks />
      <PetStats />
      <Newsletter />
    </div>
  );
}
