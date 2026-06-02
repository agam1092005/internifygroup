'use client';

import React, { useState } from "react";
import { useEffect } from 'react';
import { auth, db } from '../../../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Course {
  title?: string;
  jd?: string;
  discounted_price?: number;
  price?: number;
  subtitle?: string;
  // Add other fields as needed
}

export default function CoursePage({ params }: { params: { course: string } }) {
  const courseId = params.course;
  const [course, setCourse] = useState<Course | null>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState('');
  // Removed: const [user, setUser] = useState<User | null>(null);
  const [purchased, setPurchased] = useState(false);
  // Removed: const [loading, setLoading] = useState(false);
  // Removed: const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchCourse() {
      setCourseLoading(true);
      setCourseError('');
      try {
        const docRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(docRef);
        
        const dummyCourses: Record<string, any> = {
          'frontend-mastery': { title: 'Frontend Mastery', jd: 'Master the art of building responsive, performant, and beautiful user interfaces using React, Next.js, and modern CSS frameworks like Tailwind. This course will take you from the basics of DOM manipulation to advanced state management and Server-Side Rendering.' },
          'backend-architecture': { title: 'Backend Architecture', jd: 'Learn to design scalable, secure, and robust APIs. This course covers Node.js, Express, Firebase, databases (SQL & NoSQL), authentication, and deployment strategies for high-traffic applications.' },
          'fullstack-bootcamp': { title: 'Fullstack Bootcamp', jd: 'An intensive 12-week program that covers everything you need to know to become a Fullstack Developer. From building user interfaces with React to managing databases and APIs on the backend. You will build and deploy real-world projects.' },
          'data-structures-algorithms': { title: 'Data Structures & Algorithms', jd: 'Nail your coding interviews and improve your problem-solving skills. Dive deep into Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and algorithmic complexities (Big O).' }
        };
        
        if (docSnap.exists()) {
          setCourse(docSnap.data());
        } else if (dummyCourses[courseId]) {
          setCourse(dummyCourses[courseId]);
        } else {
          setCourse({ title: courseId.replace('-', ' ').toUpperCase(), jd: 'Welcome to this gamified course! Master the required skills, complete the projects, and earn your badges to climb the leaderboard.' });
        }
      } catch {
        // Fallback to dummy data on error
        const dummyCourses: Record<string, any> = {
          'frontend-mastery': { title: 'Frontend Mastery', jd: 'Master the art of building responsive, performant, and beautiful user interfaces using React, Next.js, and modern CSS frameworks like Tailwind. This course will take you from the basics of DOM manipulation to advanced state management and Server-Side Rendering.' },
          'backend-architecture': { title: 'Backend Architecture', jd: 'Learn to design scalable, secure, and robust APIs. This course covers Node.js, Express, Firebase, databases (SQL & NoSQL), authentication, and deployment strategies for high-traffic applications.' },
          'fullstack-bootcamp': { title: 'Fullstack Bootcamp', jd: 'An intensive 12-week program that covers everything you need to know to become a Fullstack Developer. From building user interfaces with React to managing databases and APIs on the backend. You will build and deploy real-world projects.' },
          'data-structures-algorithms': { title: 'Data Structures & Algorithms', jd: 'Nail your coding interviews and improve your problem-solving skills. Dive deep into Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and algorithmic complexities (Big O).' }
        };
        if (dummyCourses[courseId]) {
          setCourse(dummyCourses[courseId]);
        } else {
          setCourse({ title: courseId.replace('-', ' ').toUpperCase(), jd: 'Welcome to this gamified course! Master the required skills, complete the projects, and earn your badges to climb the leaderboard.' });
        }
      } finally {
        setCourseLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u: User | null) => {
      // Removed: setUser(u);
      if (u) {
        // Check if course is already purchased
        const res = await fetch(`/api/user-courses?userId=${u.uid}`);
        if (!res.ok) {
          setPurchased(false);
          // Do not set message for purchase status fetch failure
          return;
        }
        const data = await res.json();
        if (data.purchasedCourses && data.purchasedCourses.includes(courseId)) {
          setPurchased(true);
        }
      }
    });
    return () => unsub();
  }, [courseId]);

  // Removed file navigation handlers (not needed)

  // Removed: const courseName = course?.title || courseId;

  // Helper to get JWT from localStorage or cookie
  function getToken() {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (token) return token;
    // Fallback to cookie
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  const token = getToken();

  // Removed: const handlePayment = async () => { ... } (function is unused)

  if (courseLoading) return <div className="p-8 text-black">Loading course...</div>;
  if (courseError) return <div className="p-8 text-red-600">{courseError}</div>;

  const jd = course?.jd || 'No description available.';

  return (
    <div style={{ fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif' }}>
      <div className="min-h-screen bg-gray-50 flex flex-row w-full justify-center items-start pt-12">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-2xl mx-auto p-8 flex flex-col">
          <div className="flex flex-col items-center mb-4">
            <span className="text-6xl mb-4">🚀</span>
            <div className="text-lg font-semibold text-black">Level up your skills and earn badges in</div>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-black text-center">{course?.title || courseId}</h1>
          
          <div className="flex justify-center w-full mt-2 mb-6">
            {purchased ? (
              <div className="p-2 bg-green-100 text-green-800 rounded text-center text-sm">You are enrolled in this course</div>
            ) : (
              <button
                className="px-6 py-2 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-900 transition"
                onClick={() => router.push(`/`)}
              >
                Enroll Now
              </button>
            )}
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          {/* Job description now full width, no sidebar */}
          <div className="mb-4 text-gray-800 text-[15px] leading-relaxed whitespace-pre-line w-full">
            {jd}
          </div>
          {/* Removed: {message && <div className="mb-2 text-center text-sm text-black">{message}</div>} */}
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    Cashfree?: unknown;
  }
} 