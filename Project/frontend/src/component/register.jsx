import React from "react";

import { useState } from "react";

import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fillform = async (e) => {
    e.preventDefault();
    setUsername(e.target[0].value);
    setFullname(e.target[1].value);
    setEmail(e.target[2].value);
    setPassword(e.target[3].value);

    try {
      const res = await axios.post("http://localhost:8000/create", {
        username,

        fullname,

        email,

        password,
      });

      setUsername("");

      setFullname("");

      setEmail("");

      setPassword("");

      console.log(res.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

          <p className="text-gray-500 text-sm mt-1">
            Join us and start your journey 🚀
          </p>
        </div>

        {/* Form */}

        <form className="space-y-5" onSubmit={fillform}>
          {/* Username */}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Full Name */}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>

            <input
              type="text"
              name="fullname"
              placeholder="Enter full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Email */}

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/update.jsx"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
