"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyOffer() {
  const params = useParams();
  const courseId = params.course;
  // TODO: Fetch course price and discounted_price from backend or context
  const price = 1999; // Placeholder
  const discounted_price = 999; // Placeholder

  const [form, setForm] = useState({
    gender: '',
    region: '',
    country: '',
    disability: '',
    veteran: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handlePayment() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch('/api/cashfree-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: discounted_price,
          courseId,
          // Add user info if needed
        }),
      });
      const data = await res.json();
      if (!data.sessionToken) throw new Error(data.error || 'Failed to create order');

      // Load Cashfree SDK if not loaded
      if (!window.Cashfree) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      // Initialize the SDK and open checkout
      const cashfree = (window.Cashfree as { (options: { mode: string }): { checkout: (opts: { paymentSessionId: string; redirectTarget: string }) => void } })({ mode: 'production' }); // or 'sandbox' for testing
      cashfree.checkout({
        paymentSessionId: data.sessionToken,
        redirectTarget: '_self',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment error';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif' }} className="min-h-screen bg-white flex flex-col items-center justify-start p-4 overflow-y-auto">
      <div className="w-full max-w-lg">
        <h1 className="text-xl font-bold mb-8 text-center">Next Steps</h1>
        <form className="w-full space-y-6 mb-6">
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} required className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2 bg-white">
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Region</label>
            <input name="region" value={form.region} onChange={handleChange} required className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2" placeholder="e.g. EU, US, Asia" />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Country</label>
            <input name="country" value={form.country} onChange={handleChange} required className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2" placeholder="Your country" />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Do you have a disability?</label>
            <select name="disability" value={form.disability} onChange={handleChange} required className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2 bg-white">
              <option value="">Select</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Are you a protected veteran?</label>
            <select name="veteran" value={form.veteran} onChange={handleChange} required className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2 bg-white">
              <option value="">Select</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </form>
        <button
          className="w-full bg-black text-white py-3 rounded-lg text-base font-semibold hover:bg-gray-900 transition mb-4"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : (<>
            Take training and get assured opportunities in <span className="line-through mr-2">₹{price}</span> ₹{discounted_price}
          </>)}
        </button>
        {message && <div className="text-center text-sm mt-2">{message}</div>}
        <div className="text-gray-600 text-center">Complete your training to unlock exclusive internship opportunities with our hiring partners!</div>
      </div>
    </div>
  );
} 