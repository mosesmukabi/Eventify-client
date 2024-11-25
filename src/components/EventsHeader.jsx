import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../utils/userContext";

function EventsHeader() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">Eventify</div>
      <nav className="space-x-4">
        <Link to="/events">Events</Link>
        <Link to="/postEvent">Post Event</Link>
        <Link to="/my-events">My Events</Link>
        <Link to="/joined-events">Joined Events</Link>
        <Link to="/profile">Profile</Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default EventsHeader;
