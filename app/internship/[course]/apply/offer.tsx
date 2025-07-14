"use client";

import { useParams } from "next/navigation";

export default function ApplyOffer() {
  const params = useParams();
  // TODO: Fetch course price and discounted_price from backend or context
  const price = 1999; // Placeholder
  const discounted_price = 999; // Placeholder

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-gray-50 rounded shadow p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Next Steps</h1>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-blue-700 transition mb-4"
          // onClick={...} // Add payment or next action here
        >
          Take training and get assured opportunities in <span className="line-through mr-2">₹{price}</span> ₹{discounted_price}
        </button>
        <div className="text-gray-600 text-center">Complete your training to unlock exclusive internship opportunities with our hiring partners!</div>
      </div>
    </div>
  );
} 