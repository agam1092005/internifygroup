'use client';
import { AnimatedGridPattern } from "../components/ui/animated-grid-pattern";
import { AuroraText } from "../components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import img from '/app/students.jpg';
import EmailCard from "../components/animata/card/email-feature-card";
import { WordRotate } from "../components/ui/word-rotate";
import { CardStackDemo } from "../components/ui/stack-card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AtSign, Command, Eclipse, Zap } from "lucide-react";

export default function Home() {
  const items = [
    {
      id: "1",
      icon: Command,
      title: "What makes Internify unique?",
      content:
        "Internify focuses on hands-on industrial training in various software fields. We offer real-time projects after module completion, ensuring practical exposure and industry-relevant experience.",
    },
    {
      id: "2",
      icon: Eclipse,
      title: "How can I customize my learning experience?",
      content:
        "Our structured modules cover diverse domains like web development, app development, AI/ML, and blockchain. Learners can choose specializations based on their interests and career goals.",
    },
    {
      id: "3",
      icon: Zap,
      title: "Is the training practical and industry-focused?",
      content:
        "Absolutely! Each module integrates real-world project assignments, allowing learners to apply their skills in realistic scenarios and gain practical expertise.",
    },
    {
      id: "4",
      icon: AtSign,
      title: "What certifications does Internify offer?",
      content:
        "Upon successful project completion, we provide industry-recognized certificates, validating your skills and enhancing your professional profile.",
    },
  ];
  
  return (
    <>
      <div className="h-screen w-screen flex flex-col text-center items-center justify-center align-center">
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
      <AuroraText>Internify</AuroraText> Group 
      </h1>
      <h1 className="text-2xl mt-2">Get full hands-on experience</h1>
      <Button className="group h-auto gap-4 py-3 text-left mt-4" variant="outline">
        <div className="space-y-1">
          <h3>Get Started</h3>
          <p className="whitespace-break-spaces font-normal text-muted-foreground">
            Ready to upskill my career in tech
          </p>
        </div>
        <ChevronRight
          className="opacity-60 transition-transform group-hover:translate-x-0.5"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      </Button>
      <AnimatedGridPattern maxOpacity={0.2} numSquares={20} className="h-screen w-screen flex flex-col text-center items-center justify-center align-center">
      </AnimatedGridPattern>
      </div>
      
      <section className="h-screen w-screen flex lg:flex-row flex-col items-center justify-between align-center">
        <div className="space-y-4 max-w-[800px] w-full lg:px-20 px-5 mt-10">
          <h2 className="text-2xl font-bold">Why Internify?</h2>
          <Accordion type="single" className="w-full" defaultValue="1">
            {items.map((item) => (
              <AccordionItem value={item.id} key={item.id} className="py-2">
                <AccordionTrigger className="py-2 text-md leading-6 hover:no-underline">
                  <span className="flex items-center gap-3">
                    <item.icon
                      size={16}
                      strokeWidth={2}
                      className="shrink-0 opacity-60"
                      aria-hidden="true"
                    />
                    <span>{item.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-2 ps-7 text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="h-screen lg:w-3/5 lg:py-0">
          <img src={img.src} className="object-cover h-full w-full object-[30%]" />
        </div>
      </section>
      <section className="h-screen w-screen flex flex-col lg:flex-row justify-center items-center align-center lg:mt-0 mt-40">
        <div className="h-full lg:w-1/2 w-full flex flex-col pt-40 lg:justify-start lg:items-start justify-center items-center align-center lg:px-4">
          <h2 className="text-2xl font-bold">Last batch was</h2>
          <WordRotate
            className="text-4xl font-light italic text-black"
            words={["Magical", "Superb", "Incredible", "Awesome"]}
          />
          <br />
          <h2 className="text-2xl font-bold">4000+ registrations</h2>
          <CardStackDemo></CardStackDemo>
        </div>
        <EmailCard>
        </EmailCard>
      </section>
    </>
  );
}
