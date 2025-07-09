'use client';

import React, { useState } from "react";

const modules = [
  {
    name: "Introduction",
    unlocked: true,
    files: ["Welcome.pdf", "Syllabus.pdf"],
    quiz: true,
  },
  {
    name: "Module 2: Basics",
    unlocked: false,
    files: ["Lecture1.pdf", "Lecture2.pdf"],
    quiz: true,
  },
  {
    name: "Module 3: Advanced",
    unlocked: false,
    files: ["Project.pdf"],
    quiz: true,
  },
];

export default function CoursePage({ params }: { params: { course: string } }) {
  const courseName = params.course.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const files = modules[0].files;
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);

  const handlePrev = () => {
    setSelectedFileIdx((idx) => (idx > 0 ? idx - 1 : idx));
  };
  const handleNext = () => {
    setSelectedFileIdx((idx) => (idx < files.length - 1 ? idx + 1 : idx));
  };

  return (
    <div className="min-h-screen bg-white flex flex-row w-full">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-black">{courseName}</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Module Files</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {files.map((file, idx) => (
              <div
                key={file}
                className={`border border-gray-300 rounded p-4 cursor-pointer ${selectedFileIdx === idx ? 'bg-green-100 border-green-400' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => setSelectedFileIdx(idx)}
              >
                <span className="text-black">{file}</span>
              </div>
            ))}
          </div>
          <div className="border border-gray-300 rounded p-8 bg-white text-black min-h-[120px] flex flex-col items-center justify-center mb-4">
            <span className="text-lg font-semibold">{files[selectedFileIdx]}</span>
            <span className="text-xs text-gray-500 mt-2">(File preview placeholder)</span>
          </div>
          <div className="flex justify-between items-center w-full max-w-xs mx-auto">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={handlePrev}
              disabled={selectedFileIdx === 0}
            >
              ← Previous
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={handleNext}
              disabled={selectedFileIdx === files.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Quiz</h2>
          <div className="border border-gray-300 rounded p-4 bg-gray-50 text-black">Quiz for this module (UI only)</div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-80 bg-gray-100 border-l border-gray-200 p-6 flex flex-col">
        <h2 className="text-lg font-bold mb-4 text-black">Modules</h2>
        <div className="flex flex-col gap-4">
          {modules.map((mod, idx) => (
            <div
              key={mod.name}
              className={`rounded p-4 flex flex-col border ${mod.unlocked ? "bg-white border-green-400" : "bg-gray-200 border-gray-300 opacity-60"}`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="font-semibold text-black">{mod.name}</span>
                {!mod.unlocked && (
                  <svg className="w-4 h-4 text-gray-500 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 10-8 0v4M5 11h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                  </svg>
                )}
              </div>
              <div className="flex gap-2 flex-wrap mb-2">
                {mod.files.map((file) => (
                  <span
                    key={file}
                    className={`px-2 py-1 rounded text-xs ${mod.unlocked ? "bg-green-100 text-green-800" : "bg-gray-300 text-gray-500"}`}
                  >
                    {file}
                  </span>
                ))}
              </div>
              <span className={`text-xs font-medium ${mod.unlocked ? "text-green-700" : "text-gray-500"}`}>{mod.quiz ? "Quiz" : "No Quiz"}</span>
              {!mod.unlocked && <span className="text-xs text-gray-400 mt-2">Locked</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 