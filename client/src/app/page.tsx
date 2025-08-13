import React from "react";
import Hero from "@/sections/Hero";
import { Testimonials } from "@/sections/Testimonials";
import { Footer } from "@/sections/Footer";
import FAQs from "@/sections/FAQs";
import Tools from "@/sections/Tools";
import { Userflow } from "@/sections/Userflow";
import { Gemini } from "@/sections/Gemini";



export default function Home() {

  return (
    <>
      <section id="home" aria-label="Hero Section">
        <Hero />
      </section>
      <section id="Tools" aria-label="AI Tools">
        <Tools />
      </section>
      <section id="Build with AI" aria-label="Build with AI">
        <Gemini />
      </section>
      <section id="workflow" aria-label="Workflow Section">
        <Userflow />
      </section>
      <section id="Testimonials" aria-label="Testimonials Section">
        <Testimonials />
      </section>
      <section id="FAQs" aria-label="FAQs Section">
        <FAQs />
      </section>
      <section id="footer" aria-label="Footer Section">
        <Footer />
      </section>
    </>
  );
}
