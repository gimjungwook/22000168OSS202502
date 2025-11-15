import avatar from './avatar.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={avatar} className="App-avatar" alt="Jungwook Kim" />
        <h1>Jungwook Kim</h1>
        <p className="App-title">
          Handong Global University Junior Student
        </p>
        <p className="App-info">
          Birthday: September 26, 2001
        </p>
      </header>
    </div>
  );
}

export default App;
