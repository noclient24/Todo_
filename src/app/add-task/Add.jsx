'use client';
import { useState } from "react";
import imageadd from "../assets/image/undraw_add-friends_v4kx.png";
import Image from 'next/image';
import { AddTask } from "../serveres/addtask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddTaskForm = () => {
 
  const [task, setTask] = useState({
    tittle: "", // Fixed typo from 'tittle' to 'title'
    content: "",
    status: "none",
    userId: "6830229d82b191a656d982e3"
  });

  const handleClear = () => {
    setTask({
      tittle: "",
      content: "",
      status: "none", // Reset to initial state
      userId: "6830229d82b191a656d982e3" // Keep userId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await AddTask(task);
      toast.success("Task added successfully!");
      handleClear();
      console.log(result);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="mx-[10%]">
        <div className="bg-gray-800 text-white p-6 rounded-lg">
          <div className="mb-8 text-center">
            <Image
              src={imageadd}
              alt="Add Task Illustration"
              width={300}
              height={300}
              className="mx-auto filter brightness-90 contrast-110 saturate-80"
              priority
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
                value={task.tittle}
                onChange={(e) => setTask({ ...task, tittle: e.target.value })}
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
                required
              >
                <option value="none">----- select status -----</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
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

export default AddTaskForm;