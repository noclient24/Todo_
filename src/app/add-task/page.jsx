'use client';
import { useState } from "react";
import imageadd from "../assets/image/undraw_add-friends_v4kx.png";
import Image from 'next/image';

const AddTaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
    userId: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(task);
  };

  const handleClear = () => {
    setTask({
      title: "",
      content: "",
      status: "",
      userId: ""
    });
  };

  console.log(task)

  return (
    <div className="bg-gray-900">
      <div className="mx-[10%]">
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

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={task.content}
                onChange={(e) => setTask({ ...task, content: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                rows={4}
                placeholder="Enter task details..."
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Add-Task
              </button>
              <button
                type="button"
                onClick={handleClear}
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