import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
// import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      {/* <ExperienceSection /> */}
      <ContactSection />
    </main>
  );
};

export default Index;
