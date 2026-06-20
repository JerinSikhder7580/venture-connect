import Image from "next/image";
import Banner from "./banner/page";
import { Section } from "lucide-react";
import Testimonials from "@/components/Testimonial";
import WhyJoin from "@/components/whyJoin";

export default function Home() {
  return (
    
    <div >
      
      <Banner/>
      <Testimonials/>
      <WhyJoin/>
    
    </div>
  );
}
