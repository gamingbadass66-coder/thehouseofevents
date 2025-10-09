import React from "react";

const Event: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#222",
        }}
      >
        The Hunt Is On!
      </h1>

      <p style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
        <strong>Date:</strong> 7th December, 2025
      </p>
      <p style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
        <strong>Time:</strong> 7 AM – 3 PM
      </p>

      {/* Add your event image */}
      <img
        src="/19a6b53f-6844-48f3-9786-9bbbe72c344a.jpg"
        alt="Amdavadi Hunt"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "16px",
          marginBottom: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />

      <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        Registrations are open now! Click below to book your spot.
      </p>

      <a
        href="https://allevents.in/ahmedabad/80002540244918?aff_id=udwkf0&ref=sharer"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1.1rem",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#444")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#000")}
      >
        Book Now
      </a>
    </div>
  );
};

export default Event;
