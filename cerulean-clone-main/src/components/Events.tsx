import React, { useState } from "react";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Music", "Workshop", "Art", "Games"];

  const eventList = [
    {
      title: "The Hunt Is On",
      description:
        "Join us for a thrilling treasure hunt across the city with exciting prizes to be won!",
      date: "December 7, 2025",
      time: "7:00 AM - 3:00 PM",
      venue: "The House of Events, Ahmedabad",
      image: "/assets/Among Us Static.jpg",
      link: "https://allevents.in/ahmedabad/80002540244918?aff_id=udwkf0&ref=sharer",
      category: "Games",
    },
    {
      title: "Among Us",
      description:
        "first ever real life among us.",
      date: " Every 2nd and 4th saturday",
      time: "7:00 PM - 10:30 PM",
      venue: "The House of Events, Ahmedabad",
      image: "@/assets/Among-Us-Static.jpg",
      link: "https://allevents.in/ahmedabad/among-us-live-action-tickets/80003133698427?ref=smdl",
      category: "Games",
    },
  ];

  // Filter events by category
  const filteredEvents =
    selectedCategory === "All"
      ? eventList
      : eventList.filter((event) => event.category === selectedCategory);

  return (
    <div id="events" className="min-h-screen bg-[#0f0f1a] text-white py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Events</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-400 mb-4">{event.description}</p>

              <div className="text-gray-400 text-sm mb-4 space-y-1">
                <p>📅 {event.date}</p>
                <p>🕒 {event.time}</p>
                <p>📍 {event.venue}</p>
              </div>

              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
              >
                Register Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
