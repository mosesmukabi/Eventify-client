import React from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      id: 1,
      image: "https://via.placeholder.com/300",
      createdBy: "John Doe",
      title: "Exploring React Components",
      theme: "Technology",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300",
      createdBy: "John Doe",
      title: "Mastering Tailwind CSS",
      theme: "Design",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300",
      createdBy: "John Doe",
      title: "Building with JavaScript",
      theme: "Development",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300",
      createdBy: "John Doe",
      title: "Scaling Your Web App",
      theme: "Engineering",
    },
  ];

  return (
    <div className="bg-gray-100 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Upcoming Events</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">Created by {event.createdBy}</p>
              <h2 className="text-lg font-bold text-gray-800 mt-2">
                {event.title}
              </h2>
              <p className="text-sm text-gray-700">Theme: {event.theme}</p>
              <Link
                to={`/events/${event.id}`}
                className="text-blue-500 mt-3 inline-block underline hover:text-blue-700"
              >
                Read more
              </Link>
              <button className="block w-full bg-blue-500 text-white text-center py-2 rounded mt-4 hover:bg-blue-600">
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
