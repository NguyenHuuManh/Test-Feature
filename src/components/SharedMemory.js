import React, { useState } from "react";
import count_worker_script from "../workerService/counterWorker";
const SharedMemory = () => {
  // eslint-disable-next-line no-undef
  const arrayBuffer = new SharedArrayBuffer(1024);
  const intArr = new Int32Array(arrayBuffer);

  const [value, setValue] = useState(0);

  const ComponentThread = ({ children }) => {
    const myWorker = new Worker(count_worker_script);
    const click = () => {
      myWorker.postMessage(intArr);
    };

    myWorker.onmessage = (ev) => {
      console.log(ev.data, "data recive");
      console.log(intArr, "====arr main====");
      setValue(intArr[0]);
    };
    return <button onClick={click}>{children}</button>;
  };

  return (
    <div>
      <div>Share data multiple thread</div>
      <ComponentThread>Thread 1</ComponentThread>
      <ComponentThread>Thread 2</ComponentThread>
      <div>Value:{value} </div>
    </div>
  );
};

export default SharedMemory;
