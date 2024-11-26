import React from "react";
import { useQuery } from "react-query";
import apiBase from "../../utils/apiBase";
import { Link, useNavigate } from "react-router-dom";

function MyEvents() {
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["myEvents"],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/events/user`, {
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const handleCreateEvent = () => {
    navigate("/postEvent");
  };

  return (
    <div className="bg-gray-100 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Events</h1>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-lg text-gray-600 mb-4">
            You haven't posted any events yet.
          </p>
          <button
            onClick={handleCreateEvent}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Create an Event
          </button>
        </div>
      ) : (
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
                <h2 className="text-lg font-bold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  Theme: {event.theme}
                </p>
                <Link
                  to={`/event/${event.id}`}
                  className="text-blue-500 inline-block underline hover:text-blue-700"
                >
                  Read more
                </Link>
                <div className="mt-4 flex flex-col gap-2">
                  {/* Delete Button */}
                  <button
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                  {/* Update Button */}
                  <button
                    className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                    onClick={() => handleUpdate(event.id)}
                  >
                    Update
                  </button>
                  {/* Participants Button */}
                  <button
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    onClick={() => handleParticipants(event.id)}
                  >
                    Participants
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;

// Event Handlers (To be implemented)
function handleDelete(eventId) {
  console.log("Delete event:", eventId);
  // Add logic to delete the event
}

function handleUpdate(eventId) {
  console.log("Update event:", eventId);
  // Add logic to navigate to the update form or perform update actions
}

function handleParticipants(eventId) {
  console.log("View participants for event:", eventId);
  // Add logic to navigate to participants page or show participants
}
