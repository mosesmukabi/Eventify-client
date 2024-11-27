import React from "react";
import { useQuery } from "react-query";
import apiBase from "../../utils/apiBase";
import { Link } from "react-router-dom";


function JoinedEvents() {
  const { isLoading, isError, error, data } = useQuery("joinedEvents", async () => {
    const response = await fetch(`${apiBase}/joined-events`, {
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="bg-gray-100 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Joined Events</h1>
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
              <h2 className="text-lg font-bold text-gray-800 mt-2">
                {event.title}
              </h2>
              <p className="text-sm text-gray-700">Theme: {event.theme}</p>
              <div className="mt-4">
              <Link
                to={`/event/${event.id}`}
                className="text-blue-500 mt-3 inline-block underline hover:text-blue-700"
              >
                Read more
              </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JoinedEvents;
