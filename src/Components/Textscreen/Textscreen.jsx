import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../../Common/api";
import SubmitPage from "../SubmitPage/SubmitPage";
import "./Textscreen.css";

const Textscreen = () => {
  const [para, setPara] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isTimerOn, setisTimerOn] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const regex = new RegExp(
    "[ A-Za-z0-9!@#$%^&*()-_=+`~;:,.<>/?|\\'\"\\[\\]\\{\\}]"
  );

  const handleInput = (e) => {
    const inputStr = e.target.value;
    if (!regex.test(inputStr) || inputStr.length < currentText.length) return;

    if (currentText.length === 0) setisTimerOn(true);

    const paraData = para;
    const textLength = inputStr.length;

    paraData[textLength - 1].isCorrect =
      paraData[textLength - 1].letter === inputStr.slice(-1) ? true : false;

    const correctLetters = paraData
      .slice(0, textLength)
      .reduce(
        (count, item) => (item.isCorrect === true ? count + 1 : count),
        0
      );

    setCurrentText(inputStr);
    setPara(paraData);
    setCorrectLetters(correctLetters);
    setIncorrectLetters(textLength - correctLetters);
    setAccuracy(((correctLetters * 100) / (textLength || 1)).toFixed(2));
  };

  const fetchDataFromApi = () => {
    fetch(API_URL)
      .then((response) => response.text())
      .then((text) =>
        setPara(
          text.split("").map((item) => {
            return { letter: item, isCorrect: null };
          })
        )
      );
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);
  useEffect(() => {
    if (timer === 0) {
      setisTimerOn(false);
    }
  }, [timer]);

  useEffect(() => {
    let interval;
    if (isTimerOn) {
      interval = setInterval(
        () => setTimer((currTimer) => currTimer - 1),
        1000
      );
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerOn]);

  return (
    <>
      {!buttonClicked ? (
        <div className="container">
          <div className={!timer ? "timerCompleted" : "timer"}>
            00:{timer < 10 ? `0${timer}` : timer}
          </div>
          <div className="displayedPara">
            <p>
              {para.map((item, index) => (
                <span
                  key={index}
                  style={{
                    color: `${
                      item.isCorrect === true
                        ? "black"
                        : item.isCorrect === false
                        ? "red"
                        : "grey"
                    }`,
                  }}
                >
                  {item.letter}
                </span>
              ))}
            </p>
          </div>

          <textarea
            rows={5}
            cols={110}
            type="text"
            className="textInput"
            onChange={handleInput}
            value={currentText}
            readOnly={!timer ? true : false}
          />

          <div className="submitButton" onClick={() => setButtonClicked(true)}>
            Submit
          </div>
        </div>
      ) : (
        <SubmitPage
          accuracy={accuracy}
          correctLetters={correctLetters}
          incorrectLetters={incorrectLetters}
        />
      )}
    </>
  );
};

export default Textscreen;
