'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = () => {

  const [loginData, setLoginData] = useState({
  email: '',
  password: ""
})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(loginData.email.trim()==="" || loginData.password.trim()===""){
      toast.info("please fill forms",{
        position:'top-center'
      })
      return 
    }
    console.log(loginData)
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
              onChange={(e)=>{
                setLoginData({
                  ...loginData,email:e.target.value
                })
              }}
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
              onChange={(e)=>{
                setLoginData({
                  ...loginData,password:e.target.value
                })
              }}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
