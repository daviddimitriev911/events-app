"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDate } from "@/utils/helpers";
import axios from "axios";

export default function AddEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [location, setLocation] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const api = axios.create({
      withCredentials: true,
    });
    try {
      let payload = {
        title,
        description,
        date,
        location,
      };
      await api.post("/api/events", payload);
      router.push("/");
    } catch (error) {
      console.error(
        "An error occurred during the registration or login process:",
        error
      );
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              ADD YOUR EVENT
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              autoComplete="off"
              onSubmit={handleRegister}
            >
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-600 block w-full h-56 p-2.5"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="bg-gray-50 select-none border border-gray-300 text-gray-900 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={(e) => e.currentTarget.showPicker()}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-violet-700 hover:bg-violet-800 text-sm px-5 py-2.5 text-center"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
