"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from 'next/navigation';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { db, auth } from '../../firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import img from '../card.svg';
import Image from 'next/image';

type Payment = {
  courseName?: string;
  courseId?: string;
  timestamp?: { seconds: number };
  amount: number;
};

export default function PaymentsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/');
        return;
      }
      // Fetch transactions for this user
      const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const txns = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          courseName: data.courseName ?? '',
          courseId: data.courseId ?? '',
          timestamp: data.timestamp,
          amount: data.amount ?? 0,
        } as Payment;
      });
      setTransactions(txns);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.replace('/');
  };

  return (
    <>
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={[
              { name: "Dashboard", link: "/dashboard" },
            ]}
          />
          <div className="ml-auto">
            <NavbarButton as="button" onClick={handleLogout} variant="secondary">
              Logout
            </NavbarButton>
          </div>
        </NavBody>
      </Navbar>
      <div className="bg-white flex flex-col items-center w-full p-8">
        <h1 className="text-2xl font-bold mb-6 text-black">Payment History</h1>
        <div className="w-full max-w-2xl">
          {loading ? (
            <div>Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Image src={img.src} alt="No transactions" width={160} height={160} className="mb-10" />
              <div className="text-gray-500 text-lg font-medium ml-6">No transactions found.</div>
            </div>
          ) : (
            transactions.map((payment, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-200 py-4">
                <div>
                  <div className="font-semibold text-black">{payment.courseName || payment.courseId}</div>
                  <div className="text-xs text-gray-500">{payment.timestamp ? new Date(payment.timestamp.seconds * 1000).toLocaleString() : ''}</div>
                </div>
                <div className="text-lg font-bold text-black">₹{payment.amount}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
} 