import React from "react";
import "./HistoryPage.css";

const HistoryPage = () => {
  let history = JSON.parse(localStorage.getItem("history"));
  return (
    <div className="HistoryPage">
      <h4>Previous Scores:-</h4>
      <div className="scores">
        {history.map((data) => (
          <ul>
            <li>Correct Letters: {data.correctLetters}</li>
            <li>
              Incorrect Letters:{" "}
              {data.incorrectLetters < 0 ? "0" : `${data.incorrectLetters}`}
            </li>
            <li>Acuracy: {data.accuracy}</li>
            <li>Speed: {data.speed > 0 ? `${data.speed}` : "0"}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
