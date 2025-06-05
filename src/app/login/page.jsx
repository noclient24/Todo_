'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Login } from '../serveres/usersignup';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email.trim() || !loginData.password.trim()) {
      toast.info("Please fill all fields", { position: 'top-center' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await Login(loginData);
      if (response.data) {
        toast.success("Login successful!", { position: 'top-center' });
        // Middleware will handle the redirect automatically
        window.location.href = "/add-task"; // Full page reload to ensure context updates
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed", {
        position: "top-center"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full md:w-1/2 max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="login-email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="login-password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-200 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Login"}
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

export default LoginForm;