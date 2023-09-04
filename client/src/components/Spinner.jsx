import React from "react";

const Spinner = ({ position, left, top }) => {
  return (
    <div
      className="spinner"
      style={{
        position: `${position}`,
        left: `${left}`,
        top: `${top}`,
      }}
    >
      <i className="fa-solid fa-gear"></i>
    </div>
  );
};

export default Spinner;
