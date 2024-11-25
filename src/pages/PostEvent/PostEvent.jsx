import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiBase from "../../utils/apiBase";
import Input from "../../utils/Input";

function PostEvent() {
  // State management for form inputs
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState(""); // Image URL as a string
  const [body, setBody] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  // Mutation for posting events
  const { mutate, isLoading } = useMutation({
    mutationFn: async (event) => {
      const response = await fetch(`${apiBase}/events`, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Includes cookies for authenticated requests
      });
      console.log(response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post event.");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      toast.success("Event posted successfully!");
      navigate(`/event/${data.id}`);
      console.log("Response from server:", data); // Log the server response
    },
    onError: (error) => {
      toast.error(error.message || "Error posting event!");
      console.error("Error in mutation:", error.message);
    },
  });

  // Handle image upload
  const handleImageUpload = (url) => {
    setImage(url); // Set the uploaded image URL
    console.log("Image URL set to:", url); // Log the uploaded image URL
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!title || !theme || !image || !body || !number) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Prepare the event object
    const event = {
      title,
      theme,
      image, // Image URL
      body,
      number: parseInt(number, 10), // Ensure number is an integer
    };

    // Log the event data for debugging
    console.log("Event data being sent:", event);

    // Use the mutation to post the data
    mutate(event);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Post an Event</h1>
      <form onSubmit={handleSubmit}>
        {/* Image Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Image
          </label>
          <Input onImageUpload={handleImageUpload} />
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter event title"
          />
        </div>

        {/* Theme Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Theme
          </label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter event theme"
          />
        </div>

        {/* Body Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            placeholder="Write about the event"
          ></textarea>
        </div>

        {/* Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of Participants
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter number of participants"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            {isLoading ? "Posting..." : "Post Event"}
          </button>
        </div>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default PostEvent;
