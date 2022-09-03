import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../../Common/api";

const Textscreen = () => {
  const [para, setPara] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const regex = new RegExp(
    "[ A-Za-z0-9!@#$%^&*()-_=+`~;:,.<>/?|\\'\"\\[\\]\\{\\}]"
  );

  const checkLetter = (e) => {
    if (!regex.test(e)) return;
    setCurrentText(e);
    para[currentText.length].isCorrect =
      para[currentText.length].letter === e.slice(-1) ? true : false;

    console.log(para[currentText.length].isCorrect);
  };

  const fetchParagraph = () => {
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
    fetchParagraph();
  }, []);

  return (
    <div className="textscreen">
      <div className="display">
        <p>{para.map((item) => item.letter)}</p>
      </div>
      <input
        type="text"
        className="enteredText"
        onChange={(e) => checkLetter(e.target.value)}
        value={currentText}
      />
    </div>
  );
};

export default Textscreen;
