import React from "react";

const Spinner = ({ position }) => {
  return (
    <div
      className="spinner"
      style={{
        position: `${position}`,
      }}
    >
      <i className="fa-solid fa-gear"></i>
    </div>
  );
};

export default Spinner;
