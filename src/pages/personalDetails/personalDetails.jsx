import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import apiBase from "../../utils/apiBase";
import { toast } from "react-toastify"; // ToastContainer handled globally
import PasswordUpdate from "../passwordUpdate/passwordUpdate";

function UpdateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { isError, error } = useQuery(
    "fetchUserData",
    async () => {
      const response = await fetch(`${apiBase}/users/me`, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    },
    {
      onSuccess: (data) => {
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
      },
      onError: () => {
        toast.error("Failed to fetch user data");
      },
    }
  );

  const mutation = useMutation(
    async (updatedInfo) => {
      console.log("Payload being sent to the server:", updatedInfo);
      const response = await fetch(`${apiBase}/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedInfo),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(errorData.message || "Failed to update profile");
      }
  
      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onError: (error) => {
        const message = error.message || "Something went wrong. Please try again later.";
        toast.error(message);
      },
    }
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ firstName, lastName, email });
  };

  if (isError) {
    return <div>Error: {error?.message || "An unexpected error occurred"}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Update Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-full">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Personal Information
          </h3>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="flex flex-col col-span-full">
          <label className="text-gray-600 font-medium mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-span-full text-center">
          <button
            type="submit"
            className="py-3 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {mutation.isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <PasswordUpdate />
      </div>
    </div>
  );
}

export default UpdateProfile;
