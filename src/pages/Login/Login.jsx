import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiBase from "../../utils/apiBase";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../utils/userContext";

function Login() {
  const [email, setEmail] = useState(""); // Tracks the email input
  const [password, setPassword] = useState(""); // Tracks the password input
  const navigate = useNavigate(); // For navigation after login
  const { setIsLoggedIn } = useUser();

  // Define the mutation for login
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (userObj) => {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed"); // Trigger error state in mutation
      }

      return response.json();
    },
    onSuccess: () => {
      setIsLoggedIn(true); // Update login state
      toast.success("Login successful!");
      navigate("/events"); // Redirect to the feeds page
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during login");
    },
  });

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form reload

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Welcome Back!</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isError && <p className="text-red-600 mt-4 text-center">Wrong email or password.</p>}
      </form>
    </div>
  );
}

export default Login;
