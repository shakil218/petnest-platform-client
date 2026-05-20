import Banner from "@/components/home/Banner";
import HowAdoptionWorks from "@/components/home/HowAdoptionWorks";
import PetCareTips from "@/components/home/PetCareTips";
import PetStats from "@/components/home/PetStats";
import SuccessStories from "@/components/home/SuccessStories";
import WhyAdopt from "@/components/home/WhyAdopt";
import FeaturedPets from "@/components/pets/FeaturedPets";
import Newsletter from "@/components/shared/Newsletter";


const HomePage = async() => {
  const res = await fetch("http://localhost:5000/pets",{cache:"no-store"});
  const pets = await res.json();
  return (
    <div>
      <Banner />
      <WhyAdopt />
      <FeaturedPets pets={pets} />
      <SuccessStories />
      <PetCareTips />
      <HowAdoptionWorks />
      <PetStats />
      <Newsletter />
    </div>
  );
}

export  default HomePage;