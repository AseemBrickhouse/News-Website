import React, { useEffect, useState, useRef } from "react";
import "./css/ProgressBar.css";

const ProgressBar = ({ text, isPaused, stop }) => {
  const milliseconds = (m) => m * 60000;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const duration_ms = milliseconds(Math.ceil(words / wpm));

  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const interval = intervalRef.current;
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (stop || (isPaused && stop)) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setProgress(0);
    }
  }, [stop, isPaused]);

  const { bgcolor, completed } = {
    bgcolor: "#AD343E",
    completed: Math.floor((progress / duration_ms) * 100),
  };

  const containerStyles = {
    height: 5,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  const timeConversion = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="main-container-progressbar">
      <span className="main-container-time-current">
        {timeConversion(progress)}
      </span>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles} />
        </div>
      </div>
      {duration_ms && (
        <span className="main-container-time-duration">
          {timeConversion(duration_ms)}
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
