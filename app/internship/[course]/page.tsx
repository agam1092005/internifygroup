'use client';

import React, { useState } from "react";
import { useEffect } from 'react';
import { auth, db } from '../../../firebase';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function CoursePage({ params }: { params: { course: string } }) {
  const courseId = params.course;
  const [course, setCourse] = useState<any>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState('');
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
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
      } catch (err) {
        setCourseError('Failed to fetch course.');
      } finally {
        setCourseLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      setUser(u);
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

  const courseName = course?.title || courseId;

  // Helper to get JWT from localStorage or cookie
  function getToken() {
    if (typeof window === 'undefined') return null;
    let token = localStorage.getItem('token');
    if (token) return token;
    // Fallback to cookie
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  const token = getToken();

  const handlePayment = async () => {
    setLoading(true);
    setMessage('');
    try {
      // 1. Create order via backend
      const res = await fetch('/api/cashfree-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 999, // TODO: dynamic price
          userId: user?.uid,
          courseId,
          courseName,
          email: user?.email,
          phone: user?.phoneNumber || '9999999999',
        }),
      });
      const data = await res.json();
      if (!data.sessionToken) throw new Error(data.error || 'Failed to create order');

      // 2. Load Cashfree SDK if not loaded
      if (!window.Cashfree) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      // 3. Open Cashfree payment modal
      interface CashfreeSDK {
        checkout: (options: {
          paymentSessionId: string;
          redirectTarget: string;
          onSuccess: () => void;
          onFailure: () => void;
        }) => void;
      }
      const cashfree = window.Cashfree as CashfreeSDK;
      cashfree.checkout({
        paymentSessionId: data.sessionToken,
        redirectTarget: '_self',
        onSuccess: async () => {
          // 4. On success, update Firestore
          await fetch('/api/payment-success', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user?.uid,
              courseId,
              courseName,
              orderId: data.orderId,
              amount: 999, // TODO: dynamic price
              status: 'SUCCESS',
            }),
          });
          setPurchased(true);
          setMessage('Payment successful! Course unlocked.');
        },
        onFailure: () => {
          setMessage('Payment failed or cancelled.');
        },
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Payment error';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (courseLoading) return <div className="p-8 text-black">Loading internship...</div>;
  if (courseError) return <div className="p-8 text-red-600">{courseError}</div>;

  const jd = course?.jd || 'No job description available.';
  const price = course?.discounted_price || course?.price || 999;

  return (
    <div style={{ fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif' }}>
      <div className="min-h-screen bg-gray-50 flex flex-row w-full justify-center items-start pt-12">
        {/* Main Content: Card Style, now full width */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-2xl mx-auto p-8 flex flex-col">
          {/* Restore image and actively hiring text at the top */}
          <div className="flex flex-col items-center mb-4">
            <img src="/intern.svg" alt="Intern" className="w-32 h-32 mb-2" />
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
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Apply'}
            </button>
          )}
          <div className="border-t border-gray-200 my-4"></div>
          {/* Job description now full width, no sidebar */}
          <div className="mb-4 text-gray-800 text-[15px] leading-relaxed whitespace-pre-line w-full">
            {jd}
          </div>
          {message && <div className="mb-2 text-center text-sm text-black">{message}</div>}
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