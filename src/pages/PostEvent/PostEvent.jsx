import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiBase from "../../utils/apiBase";
import Input from "../../utils/Input";

function PostEvent() {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (event) => {
      const response = await fetch(`${apiBase}/events`, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post event.");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      navigate(`/event/${data.id}`);
      toast.success("Event posted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Error posting event!");
    },
  });

  const handleImageUpload = (url) => {
    setImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !theme || !image || !body || !number) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const event = {
      title,
      theme,
      image,
      body,
      number: parseInt(number, 10),
    };

    mutate(event);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Post an Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Event Image</label>
          <Input onImageUpload={handleImageUpload} />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter event title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Theme</label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter event theme"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Details</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
            rows="5"
            placeholder="Write about the event"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Number of Participants</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter number of participants"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
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
