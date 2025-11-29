import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import List from './components/List';
import Detail from './components/Detail';
import Create from './components/Create';
import Update from './components/Update';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
