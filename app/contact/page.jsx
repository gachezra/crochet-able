"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'general',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data. Replace this with your form submission logic.
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! (This is a mock submission.)");
    setFormData({
      name: '',
      email: '',
      subject: '',
      inquiryType: 'general',
      message: '',
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar/>

      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">
          Have a question, feedback, or just want to say hello? Fill out the form below and we'll get back to you soon.
        </p>
        <form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject of your message"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <label htmlFor="inquiryType" className="block text-gray-700 font-medium mb-2">
                Inquiry Type
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your inquiry or feedback here..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
