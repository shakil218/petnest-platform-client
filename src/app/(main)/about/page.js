import About from "@/components/about/About";
import Community from "@/components/about/Community";
import OurMission from "@/components/about/OurMission";
import OurStory from "@/components/about/OurStory";
import Newsletter from "@/components/shared/Newsletter";

export const metadata = {
  title: "About Us - Pet Adoption Platform",
  description: "Learn more about our pet adoption platform, our mission, and how we are making a difference in the lives of pets and their new families.",
};

const AboutPage = () => {
  return (
    <div>
      <About />
      <OurStory />
      <OurMission />
      <Community />
      <Newsletter />
    </div>
  );
};

export default AboutPage;