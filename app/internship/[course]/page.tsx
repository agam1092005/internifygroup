'use client';

import React, { useState } from "react";
import { useEffect } from 'react';
import { auth } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
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
        if (docSnap.exists()) {
          setCourse(docSnap.data());
        } else {
          setCourseError('Course not found.');
        }
      } catch {
        setCourseError('Failed to fetch course.');
      } finally {
        setCourseLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
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

  if (courseLoading) return <div className="p-8 text-black">Loading internship...</div>;
  if (courseError) return <div className="p-8 text-red-600">{courseError}</div>;

  const jd = course?.jd || 'No job description available.';
  // Removed: const price = course?.discounted_price || course?.price || 999; (unused)

  return (
    <div style={{ fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif' }}>
      <div className="min-h-screen bg-gray-50 flex flex-row w-full justify-center items-start pt-12">
        {/* Main Content: Card Style, now full width */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-2xl mx-auto p-8 flex flex-col">
          {/* Restore image and actively hiring text at the top */}
          <div className="flex flex-col items-center mb-4">
            <Image src="/intern.svg" alt="Intern" width={128} height={128} className="w-32 h-32 mb-2" />
            <div className="text-lg font-semibold text-black">7 actively hiring partners are looking for</div>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-black">{course?.title || courseId}</h1>
          {/* Small Apply Button just below title */}
          {purchased ? (
            <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-center text-sm">You have already purchased this</div>
          ) : !token ? (
            <button
              className="mb-4 px-4 py-1.5 bg-black text-white rounded font-semibold text-sm w-28 self-start hover:bg-gray-900 transition"
              onClick={() => router.push(`/login?redirect=/internship/${courseId}`)}
            >
              Apply
            </button>
          ) : (
            <button
              className="mb-4 px-4 py-1.5 bg-black text-white rounded font-semibold text-sm w-28 self-start hover:bg-gray-900 transition disabled:opacity-50"
              onClick={() => router.push(`/internship/${courseId}/apply`)}
              disabled={false} // Removed loading state
            >
              Apply
            </button>
          )}
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