import logo from "./logo.svg";
import "./App.css";
import SingleThread from "./components/SingleThread";
import MultiThread from "./components/MultiThread";
import SharedMemory from "./components/SharedMemory";
import { useEffect } from "react";
import { getAllCookie, getCookie, setCookie } from "./helper";

function App() {
  useEffect(() => {
    setCookie("testCookie", "giá trị test", 1);
    getAllCookie();
    const cookei = getCookie("testCookie");
    console.log(cookei, "====cookei======");
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <SingleThread />
      <MultiThread />
      <SharedMemory />
    </div>
  );
}

export default App;
