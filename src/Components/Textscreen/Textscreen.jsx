import React, { useEffect } from "react";
import { useState } from "react";

const Textscreen = () => {
  const [para, setPara] = useState("");
  const handleKeyDown = (e) => {
    para[0].split("").forEach((c) => {
      if (c === e.key) {
        console.log("matched");
      }
    });
  };

  useEffect(() => {
    fetch(`https://baconipsum.com/api/?type=meat-and-filler&paras=1`).then(
      (result) => result.json().then((result) => setPara(result))
    );
  }, []);

  return (
    <div className="textscreen">
      <div className="display">
        <p>{para}</p>
      </div>
      <input type="text" className="enteredText" onKeyDown={handleKeyDown} />
    </div>
  );
};

export default Textscreen;
