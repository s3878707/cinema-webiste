import React from "react";
import "./Release.css"; // Import your CSS file

const ReleaseComponent = () => {
  return (
    <div className="release-container">
      <div className="release-column">
        <h2>September Release</h2>
        <p>September 15: Tom and Jerry</p>
        <p>September 17: Tom and Jerry 2</p>
      </div>
      <div className="release-column">
        <h2>October Release</h2>
        <p>October 10: Kung Pu Panda</p>
        <p>October 14: Kung Pu Panda 2</p>
      </div>
      <div className="release-column">
        <h2>November Release</h2>
        <p>November 10: The Monkey King</p>
        <p>November 17: The Monkey King 2</p>
      </div>
    </div>
  );
};

export default ReleaseComponent;
