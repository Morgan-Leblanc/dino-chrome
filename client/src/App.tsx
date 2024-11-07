import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Launcher from './components/Launcher';
import AuthSwitcher from './pages/AuthSwitcher';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthSwitcher />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/launcher" element={<Launcher />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;