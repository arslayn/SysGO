import React, { useState } from "react";
import "./SystemInfo.css"; // Import the CSS file for styling

const SystemInfo = ({ onUserSpecsUpdate }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSystemInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/system-info");
      if (!response.ok) {
        // Log the response status and status text for better debugging
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setInfo(data);
      // Prepare user specs based on fetched data
      const userSpecs = {
        cpu: `${data.cpu.brand} (${data.cpu.manufacturer})`,
        ram: `${data.memory.total} Total RAM`,
        gpu: data.gpu.map((g) => g.model).join(", "),
        storage: data.storage.map((s) => `${s.name} (${s.size})`).join(", "),
      };
      onUserSpecsUpdate(userSpecs); // Pass user specs to parent
    } catch (error) {
      // Log the error message for better debugging
      console.error("Error fetching system information:", error);
      setError(
        "Failed to fetch system information. Please check the console for more details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="system-info-container">
      <h1>System Configuration</h1>
      <button onClick={getSystemInfo} className="fetch-button">
        Get System Info
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {info && (
        <div className="info-display">
          {/* Display system information */}
        </div>
      )}
    </div>
  );
};

export default SystemInfo;
