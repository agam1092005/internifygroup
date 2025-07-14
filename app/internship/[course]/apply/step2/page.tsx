"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function ApplyStep2() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course;
  const [form, setForm] = useState({ why: "", strengths: "", goals: "", challenge: "", available: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    // Optionally validate fields here
    router.push(`/internship/${courseId}/apply/step3`);
  }

  return (
    <div style={{ fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif' }} className="min-h-screen bg-white flex flex-col items-center justify-start p-4 overflow-y-auto">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">HR Questions & Resume</h1>
        <form onSubmit={handleContinue} className="space-y-8">
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-2">Why do you want this internship?</label>
            <textarea
              name="why"
              value={form.why}
              onChange={handleChange}
              required
              minLength={50}
              maxLength={250}
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-4 text-lg mb-2 resize-none bg-white"
              rows={4}
              placeholder="Your answer (50-250 characters)"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-2">What are your strengths?</label>
            <textarea
              name="strengths"
              value={form.strengths}
              onChange={handleChange}
              required
              minLength={50}
              maxLength={250}
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-4 text-lg mb-2 resize-none bg-white"
              rows={3}
              placeholder="Your answer (50-250 characters)"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-2">What are your career goals?</label>
            <textarea
              name="goals"
              value={form.goals}
              onChange={handleChange}
              required
              minLength={50}
              maxLength={250}
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-4 text-lg mb-2 resize-none bg-white"
              rows={3}
              placeholder="Your answer (50-250 characters)"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-2">Describe a challenge you overcame.</label>
            <textarea
              name="challenge"
              value={form.challenge}
              onChange={handleChange}
              required
              minLength={50}
              maxLength={250}
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-4 text-lg mb-2 resize-none bg-white"
              rows={3}
              placeholder="Your answer (50-250 characters)"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-2">What internship duration are you available for?</label>
            <select
              name="available"
              value={form.available}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-lg mb-2 bg-white"
            >
              <option value="">Select</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="12 months">12 months</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-2">Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              required
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-lg mb-2 bg-white"
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