"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function DashboardPage() {
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
              { name: "Payments", link: "/payments" },
              { name: "Profile", link: "/profile" },
            ]}
          />
          <div className="ml-auto">
            <NavbarButton as="button" onClick={handleLogout} variant="secondary">
              Logout
            </NavbarButton>
          </div>
        </NavBody>
      </Navbar>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4 text-green-700">Welcome to your Dashboard!</h1>
          <p className="text-gray-700">You have successfully logged in or signed up.</p>
        </div>
      </div>
    </>
  );
} 