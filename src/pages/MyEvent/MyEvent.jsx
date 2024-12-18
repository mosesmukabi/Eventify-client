import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import apiBase from "../../utils/apiBase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyEvents() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [participants, setParticipants] = useState([]);
  const [viewingEvent, setViewingEvent] = useState(null);

  // Fetch user's events
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
      return await response.json();
    },
  });

  // Mutation for deleting an event
  const deleteMutation = useMutation(
    async (id) => {
      const response = await fetch(`${apiBase}/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return await response.json();
    },
    {
      onSuccess: () => {
        toast.success("Event deleted successfully!");
        queryClient.invalidateQueries(["myEvents"]); // Refetch events after deletion
      },
      onError: (error) => {
        toast.error(error.message || "Error deleting event!");
      },
    }
  );

  // Fetch participants for an event
  const handleParticipants = async (eventId) => {
    if (viewingEvent === eventId) {
      // Hide participants if the same button is clicked again
      setViewingEvent(null);
      setParticipants([]);
    } else {
      try {
        const response = await fetch(`${apiBase}/users/joined-event?eventId=${eventId}`, {
          credentials: "include",
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
  
        const participantsData = await response.json();
        console.log("Fetched participants:", participantsData); // Debugging log
        setParticipants(participantsData); // Update participants state
        setViewingEvent(eventId); // Set the current viewing event
      } catch (error) {
        toast.error(error.message || "Error fetching participants!");
      }
    }
  };
  
  

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleCreateEvent = () => {
    navigate("/postEvent");
  };

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

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
                    className="w-full bg-gray-600 text-white py-2 rounded hover:bg-black"
                    onClick={() => handleDelete(event.id)}
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                  {/* Update Button */}
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={() => handleUpdate(event.id)}
                  >
                    Update
                  </button>
                  {/* Participants Button */}
                  <button
                    className={`w-full py-2 rounded ${
                      viewingEvent === event.id
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    onClick={() => handleParticipants(event.id)}
                  >
                    {viewingEvent === event.id ? "Hide Participants" : "View Event Participants"}
                  </button>
                  {/* Participants List */}
                  {viewingEvent === event.id && participants.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold text-lg">Participants:</h3>
    <ul className="list-disc pl-5">
      {participants.map((participant, idx) => (
        <li key={idx}>
          {participant.firstName} {participant.lastName}
        </li>
      ))}
    </ul>
  </div>
)}
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
