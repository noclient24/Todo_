'use client';

import { useState } from 'react';
import { Signup } from '../serveres/usersignup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    about: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      about: ''
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Validate form
  if (!formData.name.trim()) {
    toast.error('Please enter your name');
    setIsLoading(false);
    return;
  }

  if (!formData.email.trim()) {
    toast.error('Please enter your email');
    setIsLoading(false);
    return;
  }

  if (!formData.password) {
    toast.error('Please enter a password');
    setIsLoading(false);
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match');
    setIsLoading(false);
    return;
  }

  try {
    const result = await Signup(formData);
    
    console.log('API Response:', result); // Add this for debugging
    
    if (result?.status === 201) {
      toast.success('Account created successfully!');
      clearForm();
    } else {
      toast.error(result?.message || 'Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Signup error:', error);
    toast.error(error?.message || 'An error occurred during signup');
  } finally {
    setIsLoading(false);
  }
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
            <label htmlFor="signup-about" className="block text-gray-300 mb-2">
              About You
            </label>
            <textarea
              id="signup-about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              rows="3"
              placeholder="Tell us a little about yourself..."
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
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Create Account'}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SignupForm;