"use client";
import { useEffect } from "react";
import React from "react";
import { useRouter } from 'next/navigation';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";

const payments = [
  {
    course: "Computer Science (General)",
    price: 999,
    timestamp: "2024-06-01 10:23",
  },
  {
    course: "Backend",
    price: 899,
    timestamp: "2024-06-02 14:12",
  },
  {
    course: "DevOps",
    price: 1499,
    timestamp: "2024-06-03 09:45",
  },
];

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function PaymentsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.replace('/');
    }
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
          {payments.map((payment, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-gray-200 py-4">
              <div>
                <div className="font-semibold text-black">{payment.course}</div>
                <div className="text-xs text-gray-500">{payment.timestamp}</div>
              </div>
              <div className="text-lg font-bold text-black">₹{payment.price}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 