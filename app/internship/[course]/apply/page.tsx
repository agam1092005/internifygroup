"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function ApplyStep1() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course;
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // TODO: Fetch course title if needed, for now use courseId
  const courseTitle = courseId;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    // Optionally validate fields here
    router.push(`/internship/${courseId}/apply/step2`);
  }

  return (
    <div style={{ fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif' }} className="min-h-screen bg-white flex flex-col items-center justify-start p-4 overflow-y-auto">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">Internship Application</h1>
        <form onSubmit={handleContinue} className="space-y-6">
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Applying for</label>
            <input
              type="text"
              value={courseTitle}
              disabled
              className="w-full bg-gray-100 text-gray-700 cursor-not-allowed border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 mb-2"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-lg mb-2"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-lg mb-2"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-lg mb-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold text-lg hover:bg-gray-900 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
} 