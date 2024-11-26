import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useUser } from "../utils/userContext";

function EventsHeader() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <div className="text-2xl font-bold">Eventify</div>
      <nav className="space-x-4">
        {/* Use NavLink for active state styling */}
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `transition-all pb-1 border-b-2 ${
              isActive ? "border-white" : "border-transparent"
            } hover:border-gray-300`
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/postEvent"
          className={({ isActive }) =>
            `transition-all pb-1 border-b-2 ${
              isActive ? "border-white" : "border-transparent"
            } hover:border-gray-300`
          }
        >
          Post Event
        </NavLink>
        <NavLink
          to="/myEvents"
          className={({ isActive }) =>
            `transition-all pb-1 border-b-2 ${
              isActive ? "border-white" : "border-transparent"
            } hover:border-gray-300`
          }
        >
          My Events
        </NavLink>
        <NavLink
          to="/joined-events"
          className={({ isActive }) =>
            `transition-all pb-1 border-b-2 ${
              isActive ? "border-white" : "border-transparent"
            } hover:border-gray-300`
          }
        >
          Joined Events
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `transition-all pb-1 border-b-2 ${
              isActive ? "border-white" : "border-transparent"
            } hover:border-gray-300`
          }
        >
          Profile
        </NavLink>
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
