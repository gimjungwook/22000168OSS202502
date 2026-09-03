import logo from "./logo.svg";
import "./App.css";
import Hello from "./Hello";
import Garage from "./Garage";
import HelloBtn from "./HelloBtn";
import HelloBtn2 from "./HelloBtn2";
import HelloBtn3 from "./HelloBtn3";
import Football from "./Football";
import Timer from "./Timer";
import CountEffect from "./CountEffect";
import RefTest from "./RefTest";
import RefTest2 from "./RefTest2";
import RefTest3 from "./RefTest3";

function App() {
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
        <Hello name="Jerry" />
        <Garage />
        <HelloBtn />
        <HelloBtn2 />
        <HelloBtn3 />
        <Football />
        <Timer />
        <CountEffect />
        <RefTest />
        <RefTest2 />
        <RefTest3 />
      </header>
    </div>
  );
}

export default App;
