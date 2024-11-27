import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiBase from "../../utils/apiBase";
import { Link } from "react-router-dom";

function Events() {
  const [joinedEvents, setJoinedEvents] = useState(() => {
    // Retrieve joined events from local storage
    const storedEvents = localStorage.getItem("joinedEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  // Fetch events
  const { isLoading, isError, error, data } = useQuery("events", async () => {
    const response = await fetch(`${apiBase}/events`, {
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  });

  // Mutation for joining an event
  const joinEventMutation = useMutation(async (eventId) => {
    const response = await fetch(`${apiBase}/events/${eventId}/join`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  });

  // Mutation for canceling a joined event
  const cancelEventMutation = useMutation(async (eventId) => {
    const response = await fetch(`${apiBase}/events/${eventId}/cancel`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  });

  // Handle joining an event
const handleJoin = async (eventId) => {
  try {
    await joinEventMutation.mutateAsync(eventId);
    const updatedEvents = [...joinedEvents, eventId];
    setJoinedEvents(updatedEvents);
    localStorage.setItem("joinedEvents", JSON.stringify(updatedEvents)); // Save to local storage
    toast.success("Successfully joined the event!", { position: "top-right" });
  } catch (error) {
    toast.error(`Error: ${error.message}`, { position: "top-right" });
    console.error(error.message);
  }
};

// Handle canceling a joined event
const handleCancel = async (eventId) => {
  try {
    await cancelEventMutation.mutateAsync(eventId);
    const updatedEvents = joinedEvents.filter((id) => id !== eventId);
    setJoinedEvents(updatedEvents);
    localStorage.setItem("joinedEvents", JSON.stringify(updatedEvents)); // Save to local storage
    toast.info("Event join canceled.", { position: "top-right" });
  } catch (error) {
    toast.error(`Error: ${error.message}`, { position: "top-right" });
    console.error(error.message);
  }
};


  // Handle loading and error states
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Render events
  return (
    <div className="bg-gray-100 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Upcoming Events</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {data.map((event, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">
                Created by {event.user.firstName} {event.user.lastName}
              </p>
              <h2 className="text-lg font-bold text-gray-800 mt-2">
                {event.title}
              </h2>
              <p className="text-sm text-gray-700">Theme: {event.theme}</p>
              <Link
                to={`/event/${event.id}`}
                className="text-blue-500 mt-3 inline-block underline hover:text-blue-700"
              >
                Read more
              </Link>
              {joinedEvents.includes(event.id) ? (
                <button
                  onClick={() => handleCancel(event.id)}
                  className="block w-full bg-red-500 text-white text-center py-2 rounded mt-4 hover:bg-red-600"
                >
                  Cancel Join Event
                </button>
              ) : (
                <button
                  onClick={() => handleJoin(event.id)}
                  className="block w-full bg-blue-500 text-white text-center py-2 rounded mt-4 hover:bg-blue-600"
                >
                  Join Event
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
