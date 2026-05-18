import About from "@/components/about/About";
import Community from "@/components/about/Community";
import OurMission from "@/components/about/OurMission";
import OurStory from "@/components/about/OurStory";
import Newsletter from "@/components/shared/Newsletter";


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