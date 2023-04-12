import React, { useEffect } from "react";
import { useState } from "react";

import worker_script from "../workerService/worker.js";
import { WORKER_TYPE } from "../workerService/eventName.js";
import ButtonProcess from "./ButtonProcess.js";

const MultiThread = () => {
  const [background, setBackground] = useState("blue");
  const [process, setProcess] = useState("start");
  const myWorker = new Worker(worker_script);

  const clickStart = () => {
    myWorker.postMessage({ type: WORKER_TYPE.MULTIPLE_THREAD });
  };
  useEffect(() => {
    myWorker.onmessage = (e) => {
      switch (e.data.type) {
        case WORKER_TYPE.MULTIPLE_THREAD:
          console.log(e.data, "message recive from worker");
          setProcess(e.data.value);
          break;
        default:
          break;
      }
    };
    return () => {
      myWorker.terminate();
    };
  }, []);

  return (
    <div style={{ background: background, marginTop: 10 }}>
      <span
        style={{
          color: "#FFFF",
        }}
      >
        Multiple Thread: you can change color when the process's runing
      </span>
      <ButtonProcess process={process} clickStart={clickStart} />
      <button
        onClick={() => setBackground((pre) => (pre == "blue" ? "red" : "blue"))}
      >
        change color
      </button>
    </div>
  );
};

export default MultiThread;
