import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "../components/User/Navbar";
import Hero from "../components/User/Hero";
import Services from "../components/User/Services";
import WhyUs from "../components/User/WhyUs";
import Testimonial from "../components/User/Testimonials";
import PesanMobil from "../components/User/PesanMobil";
import FAQSection from "../components/User/FAQSection";
import Footer from "../components/User/Footer";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Testimonial />
      <PesanMobil />
      <FAQSection />
      <Footer />
    </>
  );
}

export default Index;
