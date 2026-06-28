import Image from "next/image";
// import Banner from "./banner/page";
import { Section } from "lucide-react";
import Testimonials from "@/components/Testimonial";
import WhyJoin from "@/components/whyJoin";
import Banner from "./banner/page";
import FeatureStartups from "@/components/FeatureStartups";
import FeatureOpportunities from "@/components/FeatureOpportunities";


export default function Home() {
  return (

    <div >
      <Banner />
      <Testimonials />
      <FeatureStartups/>
      <WhyJoin />
      <FeatureOpportunities/>

    </div>
  );
}
