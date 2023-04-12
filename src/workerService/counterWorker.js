/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const workercode = () => {
  self.onmessage = function (e) {
    console.log("====data worker====", e.data);
    const intArr = e.data;
    Atomics.store(intArr, 0, 10);
    self.postMessage("increaSuccess");
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const count_worker_script = URL.createObjectURL(blob);

module.exports = count_worker_script;
