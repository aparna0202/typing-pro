import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../../Common/api";
import SubmitPage from "../SubmitPage/SubmitPage";
import "./Textscreen.css";
const track1 = require("../../assets/audio/60sectimer.mp3");
const track2 = require("../../assets/audio/timeover.mp3");

const Textscreen = () => {
  const [para, setPara] = useState([]);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isTimerOn, setisTimerOn] = useState(false);
  const timerStarts = new Audio(track1);
  const timerStops = new Audio(track2);

  let data = {
    correctLetters: correctLetters,
    incorrectLetters: incorrectLetters,
    accuracy: accuracy,
    speed: speed,
  };

  const regex = new RegExp(
    "[ A-Za-z0-9!@#$%^&*()-_=+`~;:,.<>/?|\\'\"\\[\\]\\{\\}]"
  );

  const pushData = () => {
    let existingData = JSON.parse(localStorage.getItem("history"));

    console.log(typeof existingData);
    if (existingData) {
      existingData.push(data);
    } else {
      existingData = [];
      existingData.push(data);
    }
    localStorage.setItem("history", JSON.stringify(existingData));
  };

  const handleInput = (e) => {
    const inputStr = e.target.value;
    if (!regex.test(inputStr) || inputStr.length < currentText.length) return;

    if (currentText.length === 0) {
      setisTimerOn(true);
    }
    if (totalKeystrokes === 0) {
      timerStarts.play();
    }
    if (timer === 1) {
      timerStarts.pause();
    }

    const paraData = para;
    const textLength = inputStr.length;

    paraData[textLength - 1].isCorrect =
      paraData[textLength - 1].letter === inputStr.slice(-1) ? true : false;

    const currentCorrectLetters =
      paraData[textLength - 1].isCorrect === true
        ? correctLetters + 1
        : correctLetters;
    setTotalKeystrokes((currentKeystrokes) => currentKeystrokes + 1);
    setCurrentText(inputStr);
    setPara(paraData);
    setCorrectLetters(currentCorrectLetters);
    setIncorrectLetters(totalKeystrokes - currentCorrectLetters);
    setAccuracy(
      ((currentCorrectLetters * 100) / (totalKeystrokes || 1)).toFixed(2)
    );
    setSpeed(Math.round(correctLetters / 5));

    if (para.length === textLength) {
      fetchDataFromApi();
      setCurrentText("");
    }
  };
  const fetchDataFromApi = () => {
    fetch(API_URL)
      .then((response) => response.text())
      .then((text) => {
        return text;
      })
      .then((text) => {
        setPara(
          text.split("").map((item) => {
            return { letter: item, isCorrect: null };
          })
        );
        return text;
      });
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      timerStops.play();
      setisTimerOn(false);
      pushData();
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
      {timer ? (
        <div className="container">
          <div className={!timer ? "timerCompleted" : "timer"}>
            00:{timer < 10 ? `0${timer}` : timer}
          </div>
          <div className="displayedPara">
            <p>
              {para.map((item, index) => (
                <span
                  className="letter"
                  key={index}
                  style={{
                    backgroundColor:
                      index === currentText.length
                        ? "rgb(63, 184, 231)"
                        : "inherit",
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
            cols={80}
            type="text"
            className="textInput"
            onChange={handleInput}
            value={currentText}
            readOnly={!timer ? true : false}
          />
        </div>
      ) : (
        <SubmitPage
          accuracy={accuracy}
          correctLetters={correctLetters}
          incorrectLetters={incorrectLetters}
          speed={speed}
        />
      )}
    </>
  );
};

export default Textscreen;
