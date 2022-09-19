import React from "react";
import "./SubmitPage.css";

const SubmitPage = ({ accuracy, correctLetters, incorrectLetters }) => {
  const speed = Math.round(correctLetters / 5);
  return (
    <div className="SubmitPage">
      <div className="textContainer">
        <h4>Congarts! Your one minute Typing Test Completed.</h4>
        <p>
          Your speed was{" "}
          <span> {speed < 0 ? `0` : `${speed}`} words per minute</span> with{" "}
          <span>{accuracy}% </span>
          accuracy. <br />
          Total number of correct letters were <span>
            {" "}
            {correctLetters}{" "}
          </span>{" "}
          and total number of incorrect letters were{" "}
          <span> {incorrectLetters}</span>.
        </p>
      </div>
    </div>
  );
};

export default SubmitPage;
