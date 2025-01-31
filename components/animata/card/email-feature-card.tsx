"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../app/firebase"; // import firestore

const EmailCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name || !formData.email || !emailRegex.test(formData.email) || !formData.phone || +formData.phone.length < 10) {
      alert("Please fill out all required fields with valid information.");
      return;
    }
  
    // Submit form data to Firestore
    try {
      await addDoc(collection(db, "formSubmissions"), formData);
      alert("Form submitted successfully!");
  
      // Optionally, reset form data after submission
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error: Unable to submit the form.");
    }
  };
  

  return (
    <div className="group relative w-full max-w-lg rounded-lg p-6 mt-10">
      <div className="relative flex flex-col gap-4 rounded-lg border border-gray-300 bg-white p-6">
        <h2 className="text-xl font-bold">Follow for Updates</h2>
        <p className="text-base font-light">Fill out the details below and we&apos;ll send you an email</p>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col mb-4">
            <label className="font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 rounded-md border border-gray-300 p-2 bg-gray-100"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className="mt-1 rounded-md border border-gray-300 p-2 bg-gray-100"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91"
              className="mt-1 rounded-md border border-gray-300 p-2 bg-gray-100"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Anything else</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Really interested in the upcoming events and workshops..."
              className="mt-1 h-24 rounded-md border border-gray-300 p-2 bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 self-end rounded-full bg-gray-600 p-2 text-white cursor-pointer transition-colors duration-300 hover:bg-green-600"
          >
            <span role="img" aria-label="send">{"\u27A4"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailCard;
