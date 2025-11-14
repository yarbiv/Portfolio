// MinuteCrypticBoxes.jsx
import React from "react";
import "./MinuteCrypticBoxes.css";

const MinuteCrypticBoxes = ({ length }) => {
  return (
    <div className="mcb-container">
      {[...Array(length)].map((_, idx) => (
        <div className="mcb-box" key={idx} />
      ))}
    </div>
  );
};

export default MinuteCrypticBoxes;
