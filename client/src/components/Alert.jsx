import React, { useState, useEffect } from "react";

const Alert = ({ message, type, time, setShowAlert }) => {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("alert").style.opacity = "1";
    }, 0);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, time);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="alert"
      style={{
        border: `1px solid ${
          type === "success" ? "#04d108" : "rgb(250, 2, 2,0.9"
        }`,
      }}
    >
      <p id="message">{message}</p>
      {type === "success" ? (
        <i
          className="fa-solid fa-circle-check icon"
          style={{
            color: "#04d108",
          }}
        ></i>
      ) : (
        <i
          className="fa-solid fa-circle-exclamation icon "
          style={{
            color: "rgb(250, 2, 2,0.9)",
          }}
        ></i>
      )}
    </div>
  );
};

export default Alert;
