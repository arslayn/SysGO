import React, { useState } from "react";
import SystemInfo from "./SystemInfo"; // Adjust the path as necessary
import AppComparison from "./AppComparison"; // Adjust the path as necessary
import "./SystemInfoApp.css"; // You'll need to create this CSS file for styling

const SystemInfoApp = () => {
  const [userSpecs, setUserSpecs] = useState({
    cpu: "",
    ram: "",
    gpu: "",
    storage: "",
  });

  const [showComparison, setShowComparison] = useState(false);

  const handleUserSpecsUpdate = (specs) => {
    setUserSpecs(specs);
    setShowComparison(true); // Automatically show comparison after specs are loaded
  };

  return (
    <div className="system-info-app-container">
      <header className="app-header">
        <h1>System Performance Analyzer</h1>
        <p>
          Analyze your system specs and compare with application requirements
        </p>
      </header>

      <SystemInfo onUserSpecsUpdate={handleUserSpecsUpdate} />

      {userSpecs.cpu && (
        <div className="specs-summary">
          <h2>Your System Specifications</h2>
          <div className="specs-grid">
            <div className="spec-item">
              <h3>CPU</h3>
              <p>{userSpecs.cpu}</p>
            </div>
            <div className="spec-item">
              <h3>RAM</h3>
              <p>{userSpecs.ram}</p>
            </div>
            <div className="spec-item">
              <h3>GPU</h3>
              <p>{userSpecs.gpu}</p>
            </div>
            <div className="spec-item">
              <h3>Storage</h3>
              <p>{userSpecs.storage}</p>
            </div>
          </div>
        </div>
      )}

      {showComparison && (
        <div className="comparison-section">
          <h2>Application Compatibility</h2>
          <AppComparison userSpecs={userSpecs} />
        </div>
      )}

      <footer className="app-footer">
        <p>System information powered by systeminfo API</p>
      </footer>
    </div>
  );
};

export default SystemInfoApp;
