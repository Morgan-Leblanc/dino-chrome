import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Launcher from './pages/Launcher';
import AuthSwitcher from './pages/AuthSwitcher';
import Game from './pages/Game';
import './App.css';
import { RootState } from 'redux/store';

interface RouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC<RouteProps> = ({ children }): ReactElement => {
  const token = useSelector((state: RootState) => state.user.token);
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute: React.FC<RouteProps> = ({ children }): ReactElement => {
  const token = useSelector((state: RootState) => state.user.token);
  return !token ? children : <Navigate to="/launcher" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <AuthSwitcher />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            } 
          />
          <Route 
            path="/launcher" 
            element={
              <PrivateRoute>
                <Launcher />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/game" 
            element={
              <PrivateRoute>
                <Game />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;