'use client';
import { AuroraText } from "../components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CardStackDemo } from "../components/ui/stack-card";
import { BackgroundLines } from "@/components/ui/background-lines";

import { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import img1 from './1.png';
import img2 from './2.png';
import img3 from './3.png';
import img4 from './4.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  title?: string;
  subtitle?: string;
  // Add other fields as needed
}

export default function Home() {
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState('');

  const positionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      setLoadingCourses(true);
      setCoursesError('');
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const fetchedCourses: Course[] = [];
        querySnapshot.forEach((doc) => {
          fetchedCourses.push({ id: doc.id, ...doc.data() });
        });
        setCourses(fetchedCourses);
      } catch {
        setCoursesError('Failed to fetch courses.');
      } finally {
        setLoadingCourses(false);
      }
    }
    fetchCourses();
  }, []);
  
  useEffect(() => {
    // No redirect or restriction for logged-in users
  }, []);
  
  return (
    <>
      <div className="h-[75vh] md:h-screen w-screen flex flex-col text-center items-center justify-center align-center relative overflow-hidden">
        <BackgroundLines className="absolute inset-0 w-full h-full -z-10">{null}</BackgroundLines>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4">
          <AuroraText>Learn. Excel. Get Hired.</AuroraText>
        </h1>
        <h2 className="text-sm md:text-2xl font-semibold text-black mb-4">
          No fake certificate. Perform & land internship at MNC.
        </h2>
        <Button className="group h-auto gap-4 py-3 text-left mt-4" variant="outline" onClick={() => {
          positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}>
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

      {/* Removed FAQ (Accordion) and image section */}
      {/* Testimonial & Internship Logos Section */}
      <section className="w-screen flex flex-col lg:flex-row items-center justify-center gap-y-12 lg:gap-y-0 lg:gap-x-16 min-h-[350px] lg:min-h-[400px] bg-white">
        {/* Left: Testimonial Cards */}
        <div className="justify-center items-center lg:ml-40 mb-6">
          <CardStackDemo />
        </div>
        {/* Right: Internship Logos */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 mt-4">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">Our students interned at</h3>
          <div className="grid grid-cols-2 gap-12">
            <Image src={img1.src} alt="Company 1" width={120} height={120} className="object-contain h-24 w-24" />
            <Image src={img2.src} alt="Company 2" width={120} height={120} className="object-contain h-24 w-24" />
            <Image src={img3.src} alt="Company 3" width={120} height={120} className="object-contain h-24 w-24" />
            <Image src={img4.src} alt="Company 4" width={120} height={120} className="object-contain h-24 w-24" />
          </div>
        </div>
      </section>

      {/* Available Courses Section */}
      <section ref={positionsRef} className="w-full py-20 bg-gray-50 flex flex-col items-center justify-center px-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Positions open</h2>
        <div className="w-full max-w-2xl">
          {loadingCourses ? (
            <div className="text-center text-gray-600">Loading positions...</div>
          ) : coursesError ? (
            <div className="text-center text-red-600">{coursesError}</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="flex items-center justify-between py-6 cursor-pointer hover:bg-gray-100 px-2 transition group"
                  tabIndex={0}
                  role="button"
                  onClick={() => {
                    router.push(`/internship/${course.id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      router.push(`/internship/${course.id}`);
                    }
                  }}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-black group-hover:underline">{course.title}</span>
                    {course.subtitle && (
                      <span className="text-gray-600 text-sm mt-1 max-w-xl line-clamp-2">{course.subtitle}</span>
                    )}
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-black transition" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 Internify. All rights reserved.
            </div>
            
            {/* Footer Links */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-center md:text-left">
              {/* Contact Us */}
              <a 
                href="mailto:agam1092005@gmail.com"
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                Contact Us
              </a>
              
              {/* Terms & Conditions */}
              <a 
                href="/tnc.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                Terms & Conditions
              </a>
              
              {/* Refund Policy */}
              <a 
                href="/refundPolicy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
