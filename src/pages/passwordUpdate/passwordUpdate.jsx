import React, { useState } from "react";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiBase from "../../utils/apiBase";

function PasswordUpdate() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Use unique toast IDs
  const successToastId = "password-update-success";
  const errorToastId = "password-update-error";

  const { mutate, isLoading } = useMutation({
    mutationFn: async (passwords) => {
      const response = await fetch(`${apiBase}/auth/password`, {
        method: "PATCH",
        body: JSON.stringify(passwords),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update password");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.dismiss(errorToastId); // Dismiss any lingering error notifications
      toast.success("Password updated successfully!", { toastId: successToastId });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      const errorMessage = error.message || "Failed to update password";
      toast.dismiss(successToastId); // Dismiss any lingering success notifications
      toast.error(errorMessage, { toastId: errorToastId });
    },
  });

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match", { toastId: errorToastId });
      return;
    }

    // Trigger the mutation for updating password
    mutate({ oldPassword, newPassword });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Password
      </h2>

      <form onSubmit={handleUpdatePassword} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-300 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Update Password"}
        </button>
      </form>

     
    </div>
  );
}

export default PasswordUpdate;
