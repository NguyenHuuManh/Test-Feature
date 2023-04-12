/* eslint-disable no-restricted-globals */

const workercode = () => {
  self.onmessage = function (e) {
    console.log("====messsage====", e.data);
    switch (e.data.type) {
      case "MULTIPLE_THREAD":
        const volume = 10000000000;
        const percentVolum = volume / 100;
        let step = 1;
        for (let index = 0; index < volume; index++) {
          if (index + 1 === percentVolum * step) {
            console.log((index + 1) * step, "====(index + 1) * step===");
            self.postMessage({
              ...e.data,
              value: step,
            });
            step++;
          }
        }
        break;
      case "SHARE_MEMORY":
        const arr = new Uint8Array(e.data.value);
        arr[0] = arr[0] + 1;
        console.log(arr[0], "====arrryyy");
        self.postMessage("increaSuccess");
        break;
      default:
        self.postMessage(e.data);
        break;
    }
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
