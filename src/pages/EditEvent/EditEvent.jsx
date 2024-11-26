import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiBase from "../../utils/apiBase";
import Input from "../../utils/Input";

function EditEvent() {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, isError, error } = useQuery({
    queryKey: ["fetchEvent", id],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/events/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setTitle(data.title);
      setTheme(data.theme);
      setImage(data.image);
      setBody(data.body);
      setNumber(data.number);
    },
  });

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedEvent) => {
      const response = await fetch(`${apiBase}/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedEvent),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return await response.json();
    },
    onSuccess: (data) => {
      toast.success("Event updated successfully!");
      navigate(`/event/${id}`); // Navigate to the event page
    },
    onError: (error) => {
      toast.error(error.message || "Error updating event");
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

    // Construct the updated event object
    const updatedEvent = {
      title,
      theme,
      image,
      body,
      number: parseInt(number, 10),
    };

    // Trigger the mutation
    mutate(updatedEvent);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Event</h1>
      {/* Display uploaded image */}
      {image && (
        <div className="mb-6 text-center">
          <img
            src={image}
            alt="Event"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}
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
            className="bg-green-500 text-white py-2 px-4 rounded disabled:opacity-50"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default EditEvent;
