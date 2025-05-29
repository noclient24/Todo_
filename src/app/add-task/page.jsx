'use client';
import imageadd from "../assets/image/undraw_add-friends_v4kx.png";
import { useState } from 'react';
import Image from 'next/image';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className=" bg-gray-900  ">
      <div className="mx-[10%]">
        {/* Image at the Top (Centered) */}
        {/* //////////////////////////////////////////////////////////////////////////// */}
        {/* Form at the Bottom (Full Width) */}
        <div className="bg-gray-800 text-white p-6 rounded-lg">
          <div className="mb-8 text-center">
            <Image
              src={imageadd}
              alt="Add Task Illustration"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">Add New Task</h2>

          <form >
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

            {/* Buttons (Using Grid Instead of Flex) */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : 'Add Task'}
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-900 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;