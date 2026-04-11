import React, { useState } from "react";
import axios from "axios";
import { uploadAvatar } from "d:/FSOCIETY/FRONTEND/Frontend/src/lib/api";
const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

sendDataToBackend();

    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setAvatar(null);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  async function sendDataToBackend() {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("fullname", `${firstName} ${lastName}`);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        formData,
      );
      console.log("Backend response:", response.data);
    } catch (err) {
      console.error("Error sending data to backend:", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-amber-50 px-4 py-8">
      <div className="relative w-full max-w-xl rounded-[32px] bg-white/95 border border-slate-200 p-8 shadow-2xl overflow-hidden">
        <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/70 blur-3xl"></div>
        <div className="absolute -right-12 top-10 h-28 w-28 rounded-full bg-cyan-200/70 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center gap-4 text-center mb-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 relative">
            <label
              htmlFor="profileImage"
              className="cursor-pointer flex items-center justify-center h-full w-full"
            >
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Profile Preview"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span className="text-3xl">+</span>
              )}
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                tabIndex={-1}
              />
            </label>
          </div>
          <h1 className="text-3xl font-semibold text-slate-800">
            Create Account
          </h1>
          <p className="max-w-xs text-sm text-slate-500">
            Sign up and get started with your new profile. Fill in the details
            below.
          </p>
        </div>

        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-600">
              First name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-600">
              Last name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-slate-600">
            username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-600">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-600">
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full mt-3 rounded-2xl bg-emerald-600 px-6 py-3 text-base font-semibold uppercase tracking-[0.02em] text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
