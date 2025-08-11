"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function ApplyStep3() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course;
  const [form, setForm] = useState({
    technologies: "",
    experience: "",
    projects: "",
    github: "",
    linkedin: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/internship/${courseId}/apply/offer`);
  }

  return (
    <div style={{ fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif' }} className="min-h-screen bg-white flex flex-col items-center justify-start p-4 overflow-y-auto">
      <div className="w-full max-w-lg">
        <h1 className="text-xl font-bold mb-8 text-center">Technical Skills</h1>
        <form onSubmit={handleContinue} className="space-y-6">
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Main technologies you have used</label>
            <input
              type="text"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2"
              placeholder="e.g. Python, React, SQL"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Years of experience in these technologies</label>
            <input
              type="text"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2"
              placeholder="e.g. 2 years"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">Notable projects (if any)</label>
            <textarea
              name="projects"
              value={form.projects}
              onChange={handleChange}
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-4 text-base mb-2 resize-none bg-white"
              rows={3}
              minLength={50}
              maxLength={250}
              placeholder="Describe any relevant projects (50-250 characters)"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">GitHub ID</label>
            <input
              type="text"
              name="github"
              value={form.github}
              onChange={handleChange}
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2"
              placeholder="Your GitHub username or profile URL"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-base font-semibold mb-1">LinkedIn ID</label>
            <input
              type="text"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black rounded-none px-0 py-2 text-base mb-2"
              placeholder="Your LinkedIn username or profile URL"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold text-base hover:bg-gray-900 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
} 