import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../../Common/api";

const Textscreen = () => {
  const [para, setPara] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isTimerOn, setisTimerOn] = useState(false);

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
    setAccuracy((correctLetters * 100) / (textLength || 1));
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
      console.log(`Timer is on`);
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
      <div className="textAreaContainer">
        <div className="contentArea">
          <p>Accuracy: {accuracy}</p>
          <p>Correct letters: {correctLetters}</p>
          <p>Incorrect Letters: {incorrectLetters}</p>
          <span>{timer}</span>
          <p>
            {para.map((item, index) => (
              <span
                key={index}
                style={{
                  color: `${
                    item.isCorrect === true
                      ? "green"
                      : item.isCorrect === false
                      ? "red"
                      : "black"
                  }`,
                }}
              >
                {item.letter}
              </span>
            ))}
          </p>
        </div>
        <textarea
          rows={10}
          type="text"
          className="textInput"
          onChange={handleInput}
          value={currentText}
        />
      </div>
      <div className="accuracyDisplayContainer">{}</div>
    </>
  );
};

export default Textscreen;
