import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
    // Additional tasks like clearing tokens can be added here
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
