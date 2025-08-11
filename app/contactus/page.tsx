'use client';

import { useEffect } from 'react';

export default function ContactUs() {
  useEffect(() => {
    // Redirect to email after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'mailto:agam1092005@gmail.com';
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-4">Redirecting you to our email...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">
          If you&apos;re not redirected automatically, 
          <a 
            href="mailto:agam1092005@gmail.com" 
            className="text-blue-600 hover:underline ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}
