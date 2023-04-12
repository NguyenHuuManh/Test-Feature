import React, { useEffect } from "react";
import { useState } from "react";
import worker_script from "../workerService/worker";
import { WORKER_TYPE } from "../workerService/eventName";
import ButtonProcess from "./ButtonProcess";
const SingleThread = () => {
  const [background, setBackground] = useState("blue");
  const [process, setProcess] = useState("start");
  let myWorker = new Worker(worker_script);

  const clickStart = () => {
    const volume = 10000000000;
    const percentVolum = volume / 100;
    let step = 1;
    for (let index = 0; index < volume; index++) {
      if (index + 1 === percentVolum * step) {
        console.log((index + 1) * step, "====(index + 1) * step===");
        myWorker.postMessage({ type: WORKER_TYPE.COUNTER_SING, value: step });
        step++;
      }
    }
    alert("Finish");
  };

  return (
    <div style={{ background: background }}>
      <span
        style={{
          color: "#FFFF",
        }}
      >
        SingleThread: you can't change color when the process's runing
      </span>
      <ButtonProcess clickStart={clickStart} process={process} />
      <button
        onClick={() => setBackground((pre) => (pre == "blue" ? "red" : "blue"))}
      >
        change color
      </button>
    </div>
  );
};

export default SingleThread;
