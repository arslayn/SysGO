import React, { useState } from "react";

const AppComparison = ({ userSpecs }) => {
  const [selectedApp, setSelectedApp] = useState("");
  const [comparisonResult, setComparisonResult] = useState("");

  const applications = {
    "Adobe Photoshop 2025": {
      cpu: "Intel or AMD processor with 64-bit support",
      ram: "8 GB (16 GB recommended)",
      gpu: "GPU with DirectX 12 support and 2 GB of GPU memory",
      storage: "4 GB of available disk space",
    },
    "Cyberpunk 2077": {
      cpu: "Intel Core i5-3570 or AMD FX-8310",
      ram: "8 GB (12 GB recommended)",
      gpu: "NVIDIA GeForce GTX 780 or AMD Radeon RX 470",
      storage: "70 GB of available space",
    },
    "Blender 3D": {
      cpu: "64-bit dual-core 2.0 GHz",
      ram: "4 GB (8 GB recommended)",
      gpu: "OpenGL 3.3 compatible graphics card",
      storage: "500 MB of available disk space",
    },
    "GTA V": {
      cpu: "Intel Core 2 Quad Q6600 or AMD Phenom 9850",
      ram: "4 GB (8 GB recommended)",
      gpu: "NVIDIA 9800 GT 1GB or AMD HD 4870 1GB",
      storage: "72 GB of free disk space",
    },
    "Microsoft Office 2025": {
      cpu: "1.6 GHz or faster, 2-core processor",
      ram: "4 GB (8 GB recommended)",
      gpu: "DirectX 10 graphics card",
      storage: "4 GB of available disk space",
    },
  };

  const handleComparison = () => {
    const appRequirements = applications[selectedApp];
    if (appRequirements) {
      const result = `
        Application: ${selectedApp}
        CPU Requirement: ${appRequirements.cpu}
        RAM Requirement: ${appRequirements.ram}
        GPU Requirement: ${appRequirements.gpu}
        Storage Requirement: ${appRequirements.storage}
      `;
      setComparisonResult(result);
    }
  };

  return (
    <div>
      <div>
        <h2>Your System Specifications:</h2>
        <p>
          <strong>CPU:</strong> {userSpecs.cpu}
        </p>
        <p>
          <strong>RAM:</strong> {userSpecs.ram}
        </p>
        <p>
          <strong>GPU:</strong> {userSpecs.gpu}
        </p>
        <p>
          <strong>Storage:</strong> {userSpecs.storage}
        </p>
      </div>
      <select onChange={(e) => setSelectedApp(e.target.value)}>
        <option value="">Select an Application</option>
        {Object.keys(applications).map((app) => (
          <option key={app} value={app}>
            {app}
          </option>
        ))}
      </select>
      <div>
        <button onClick={handleComparison}>Compare Requirements</button>
        {comparisonResult && (
          <div className="comparison-result">
            <h3>Comparison Result:</h3>
            <pre>{comparisonResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppComparison;
