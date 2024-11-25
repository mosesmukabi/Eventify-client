import React from "react";
import { useParams } from "react-router-dom";
import apiBase from "../../utils/apiBase";
import { useQuery } from "react-query";

function FullEvent() {
  const { id } = useParams();

  const { isLoading, isError, error, data } = useQuery(
    ["event", id],
    async () => {
      const response = await fetch(`${apiBase}/events/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    {
      staleTime: 0, // Refetch every time
      cacheTime: 0, // Avoid using cached data
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-lg font-semibold text-red-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {data.title}
          </h2>
          {/* Created at and Created by section */}
          <div className="flex justify-between text-gray-600 text-sm mb-4">
            <p>
              <span className="font-semibold">Created on:</span>{" "}
              {new Date(data.createdAt).toDateString()}
            </p>
            <p>
              <span className="font-semibold">Created by:</span> {data.user.firstName}
            </p>
          </div>
          {/* Centered details */}
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              <span className="font-semibold text-gray-800">Theme:</span>{" "}
              {data.theme}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-semibold text-gray-800">Details:</span>{" "}
              {data.body}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Number of guests:</span>{" "}
              {data.number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullEvent;
