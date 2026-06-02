'use client';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CardStackDemo } from "../components/ui/stack-card";
import { BackgroundLines } from "@/components/ui/background-lines";

import { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [pendingCourseRoute, setPendingCourseRoute] = useState<string | null>(null);

  const [courses] = useState<Course[]>([
    { id: 'frontend-mastery', title: 'Frontend Mastery', subtitle: 'Learn React, Next.js, and modern UI design.' },
    { id: 'backend-architecture', title: 'Backend Architecture', subtitle: 'Build scalable APIs with Node.js and Firebase.' },
    { id: 'fullstack-bootcamp', title: 'Fullstack Bootcamp', subtitle: 'From zero to fullstack developer in 12 weeks.' },
    { id: 'data-structures-algorithms', title: 'Data Structures & Algorithms', subtitle: 'Master coding interviews and algorithmic thinking.' }
  ]);

  const positionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setShowAuthModal(false);
      if (pendingCourseRoute) {
        router.push(pendingCourseRoute);
      }
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleCourseClick = (courseId: string) => {
    const route = `/course/${courseId}`;
    if (user) {
      router.push(route);
    } else {
      setPendingCourseRoute(route);
      setShowAuthModal(true);
    }
  };
  
  return (
    <>
      <div className="h-[75vh] md:h-screen w-screen flex flex-col text-center items-center justify-center align-center relative overflow-hidden">
        <BackgroundLines className="absolute inset-0 w-full h-full -z-10">{null}</BackgroundLines>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Code. Level Up. Conquer.</span>
        </h1>
        <h2 className="text-sm md:text-2xl font-semibold text-black mb-4">
          Master software development through interactive, <br /> gamified challenges and expert mentorship.
        </h2>
        <div className="flex gap-4">
          <Button className="group h-auto gap-4 py-3 text-left mt-4" variant="outline" onClick={() => {
            positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <div className="space-y-1">
              <h3>Start Your Journey</h3>
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
        <Button className="group h-auto gap-4 py-3 text-left mt-4" variant="outline" onClick={() => {
          router.push('/leaderboard');
        }}>
          <div className="space-y-1">
            <h3>Leaderboard</h3>
            <p className="whitespace-break-spaces font-normal text-muted-foreground">
              See top ranked developers
            </p>
          </div>
          <ChevronRight
            className="opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
        {user && (
          <Button className="group h-auto gap-4 py-3 text-left mt-4" variant="outline" onClick={() => {
            router.push('/profile');
          }}>
            <div className="space-y-1">
              <h3>Profile</h3>
              <p className="whitespace-break-spaces font-normal text-muted-foreground">
                View your stats
              </p>
            </div>
            <ChevronRight
              className="opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        )}
        </div>
      </div>

      {/* Differentiator Section */}
      <section className="w-full py-20 bg-black text-white flex flex-col items-center justify-center px-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different?</h2>
        <p className="max-w-3xl text-lg md:text-xl mb-8 text-gray-300 text-center">
          Unlike other platforms, we gamify your learning experience to keep you motivated and engaged:
        </p>
        <ul className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <li className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 md:p-6 shadow-lg min-w-[260px] md:min-w-[320px] md:max-w-[400px] w-full">
            <span className="block text-xl font-semibold mb-2 text-white">Earn XP and Badges</span>
            <span className="text-gray-300">Complete coding challenges and master new concepts to level up your profile.</span>
          </li>
          <li className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 md:p-6 shadow-lg min-w-[260px] md:min-w-[320px] md:max-w-[400px] w-full">
            <span className="block text-xl font-semibold mb-2 text-white">Climb the Leaderboard</span>
            <span className="text-gray-300">Compete with peers globally to showcase your skills and rank among the best.</span>
          </li>
          <li className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 md:p-6 shadow-lg min-w-[260px] md:min-w-[320px] md:max-w-[400px] w-full">
            <span className="block text-xl font-semibold mb-2 text-white">Unlock Real-World Projects</span>
            <span className="text-gray-300">Use your high score and badges to unlock exclusive projects and career opportunities.</span>
          </li>
        </ul>
      </section>

      {/* Removed FAQ (Accordion) and image section */}
      {/* Testimonial & Companies Logos Section */}
      <section className="w-screen flex flex-col lg:flex-row items-center justify-center gap-y-12 lg:gap-y-0 lg:gap-x-16 min-h-[350px] lg:min-h-[400px] bg-white">
        {/* Left: Testimonial Cards */}
        <div className="justify-center items-center lg:ml-40 mb-6">
          <CardStackDemo />
        </div>
        {/* Right: Companies Logos */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 mt-4">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">Our top learners work at</h3>
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
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Available Courses</h2>
        <div className="w-full max-w-2xl">
            <ul className="divide-y divide-gray-200">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="flex items-center justify-between py-6 cursor-pointer hover:bg-gray-100 px-2 transition group"
                  tabIndex={0}
                  role="button"
                  onClick={() => handleCourseClick(course.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCourseClick(course.id);
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
                href="/contactus"
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

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-black">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="border border-gray-300 rounded px-4 py-2 w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="border border-gray-300 rounded px-4 py-2 w-full text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </form>
            <p className="mt-6 text-center text-gray-600 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="text-black font-bold underline"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setAuthError('');
                }}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
