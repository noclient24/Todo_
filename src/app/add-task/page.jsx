'use client';
import imageadd from "../assets/image/undraw_add-friends_v4kx.png"
import { useState } from 'react';
import Image from 'next/image';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({ title, content, status });
      setIsSubmitting(false);
      // Reset form after submission
      setTitle('');
      setContent('');
      setStatus('pending');
    }, 1000);
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setStatus('pending');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="  bg-gray-800 rounded-lg p-6">
          {/* Task Illustration */}

          {/* Task Form */}
          <div className="md:w-1/2 text-white">
          <div className="md:w-1/2 flex items-center justify-center">
            <Image 
              src={imageadd}
              alt="Add Task Illustration"
              width={400}
              height={400}
              className="w-full h-auto max-w-md"
            />
          </div>
            <h2 className="text-2xl font-bold text-white mb-6">Add New Task</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Title Field */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Content Field */}
              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                  rows={4}
                  placeholder="Enter task details..."
                />
              </div>

              {/* Status Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Task...
                    </span>
                  ) : 'Add Task'}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;