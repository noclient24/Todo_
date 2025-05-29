'use client';

import { useState } from 'react';

 const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full md:w-1/2 max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="signup-name" className="block text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="signup-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="signup-email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="signup-password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="signup-confirm-password" className="block text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="signup-confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

 
export default  SignupForm