"use client";
import EventCard from "@/components/EventCard";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events/upcomming");
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      setEvents(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-50 pb-8 dark:bg-gray-900 pt-8 flex flex-row gap-5 flex-wrap mx-auto max-w-7xl justify-center">
      {events && (
        <>
          {events.map((event) => {
            return (
              <EventCard
                key={event._id}
                event={event}
                fetchEvents={fetchEvents}
              />
            );
          })}
        </>
      )}
      {!loading && (!events || events.length === 0) && (
        <div className="pt-56">There are no Upcoming Events at the moment</div>
      )}
    </div>
  );
}
