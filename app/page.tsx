'use client';
import { AuroraText } from "../components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import img from '/app/students.jpg';
import EmailCard from "../components/animata/card/email-feature-card";
import { WordRotate } from "../components/ui/word-rotate";
import { CardStackDemo } from "../components/ui/stack-card";
import { Navbar, NavBody, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle } from "@/components/ui/resizable-navbar";
import { BackgroundLines } from "@/components/ui/background-lines";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AtSign, Command, Eclipse, Zap } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from "motion/react";
import Image from 'next/image';

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
  const router = useRouter();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [rightHovered, setRightHovered] = useState<number | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.replace('/dashboard');
      }
    }
  }, [router]);
  
  return (
    <>
      <Navbar>
        {/* Desktop Navbar */}
        <NavBody>
          <NavbarLogo />
          <div className="ml-auto flex gap-2 relative">
            {[{ name: "Login", link: "/login" }, { name: "Sign Up", link: "/signup" }].map((item, idx) => (
              <a
                key={item.name}
                href={item.link}
                onMouseEnter={() => setRightHovered(idx)}
                onMouseLeave={() => setRightHovered(null)}
                className="relative px-4 py-2 min-w-[90px] text-center text-neutral-600 dark:text-neutral-300 font-bold text-sm"
                style={{ display: 'inline-block' }}
              >
                {rightHovered === idx && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                    style={{ zIndex: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 60 }}
                  />
                )}
                <span className="relative z-20">{item.name}</span>
              </a>
            ))}
          </div>
        </NavBody>
        {/* Mobile Navbar */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen((v) => !v)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileMenuOpen}>
            <div className="flex flex-col w-full gap-2 mt-4">
              <NavbarButton href="/login" variant="secondary" onClick={() => setMobileMenuOpen(false)}>Login</NavbarButton>
              <NavbarButton href="/signup" variant="primary" onClick={() => setMobileMenuOpen(false)}>Sign Up</NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <div className="h-[75vh] md:h-screen w-screen flex flex-col text-center items-center justify-center align-center relative overflow-hidden">
        <BackgroundLines className="absolute inset-0 w-full h-full -z-10">{null}</BackgroundLines>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4">
          <AuroraText>Learn. Excel. Get Hired.</AuroraText>
        </h1>
        <h2 className="text-sm md:text-2xl font-semibold text-black mb-4">
          No fake certificate. Perform & land internship at MNC.
        </h2>
        <Button className="group h-auto gap-4 py-3 text-left mt-4" variant="outline" onClick={() => router.push('/login')}>
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
      </div>

      {/* Differentiator Section */}
      <section className="w-full py-20 bg-black text-white flex flex-col items-center justify-center px-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different?</h2>
        <p className="max-w-3xl text-lg md:text-xl mb-8 text-gray-300 text-center">
          Unlike other platforms, we don&apos;t stop at teaching or testing. At InternifyGroup, your progress is your passport:
        </p>
        <ul className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <li className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 md:p-6 shadow-lg min-w-[260px] md:min-w-[320px] md:max-w-[400px] w-full">
            <span className="block text-xl font-semibold mb-2 text-white">Performance-Based Placements</span>
            <span className="text-gray-300">Your course performance is your ticket to exclusive internships with our MNC partners.</span>
          </li>
          <li className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 md:p-6 shadow-lg min-w-[260px] md:min-w-[320px] md:max-w-[400px] w-full">
            <span className="block text-xl font-semibold mb-2 text-white">No Empty Certificates</span>
            <span className="text-gray-300">Every certificate is backed by real-world opportunities, not just a PDF.</span>
          </li>
          <li className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 md:p-6 shadow-lg min-w-[260px] md:min-w-[320px] md:max-w-[400px] w-full">
            <span className="block text-xl font-semibold mb-2 text-white">Direct Industry Connections</span>
            <span className="text-gray-300">We bridge the gap between learning and earning, ensuring your investment pays off.</span>
          </li>
        </ul>
      </section>

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
          <Image src={img.src} alt="Students" className="object-cover h-full w-full object-[30%]" fill sizes="100vw" />
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
