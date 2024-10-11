"use client";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import Link from "next/link";

export default function EventCard({ event, fetchEvents, actions = "ON" }) {
  const { user } = useAuth();

  const handleUnregister = async () => {
    const api = axios.create({
      withCredentials: true,
    });

    try {
      await api.delete(`/api/events/${event._id}/register`);
    } catch (error) {
      console.error(error);
    }

    await fetchEvents();
  };

  const handleDelete = async () => {
    const api = axios.create({
      withCredentials: true,
    });

    try {
      await api.delete(`/api/events/${event._id}`);
    } catch (error) {
      console.error(error);
    }

    await fetchEvents();
  };

  const handleRegister = async () => {
    const api = axios.create({
      withCredentials: true,
    });

    try {
      await api.post(`/api/events/${event._id}/register`);
    } catch (error) {
      console.error(error);
    }

    await fetchEvents();
  };

  const allowedAction = () => {
    if (!user || actions === "OFF") {
      return "NO_ACTION_ALLOWED";
    }

    if (!user || actions === "edit") {
      return "EDIT";
    }

    if (
      user &&
      event.attendees &&
      !!event.attendees.find((x) => x._id === user._id)
    ) {
      return "UNREGISTER";
    }
    if (
      user &&
      event.attendees &&
      !event.attendees.find((x) => x._id === user._id)
    ) {
      return "REGISTER";
    }
  };

  return (
    <div className="w-5/6  bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {event.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Created By: {event.createdBy.username}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Date: {event.date.split("T")[0]}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Location: {event.location}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Attendee Count: {event.attendees.length}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {event.description}
        </p>

        {allowedAction() === "REGISTER" && (
          <button
            onClick={() => {
              handleRegister();
            }}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-700 hover:bg-violet-800"
          >
            Register
          </button>
        )}

        {allowedAction() === "UNREGISTER" && (
          <button
            onClick={() => {
              handleUnregister();
            }}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-700 hover:bg-violet-800"
          >
            Unregister
          </button>
        )}

        {allowedAction() === "EDIT" && (
          <>
            <Link
              href={`my-events/${event._id}`}
              onClick={() => {
                handleUnregister();
              }}
              className=" inline-flex mr-5 items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-700 hover:bg-violet-800"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                handleDelete();
              }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 hover:bg-red-800"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
