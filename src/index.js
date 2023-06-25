import { DarkModeContextProvider } from './context/DarkModeContext';
import { AuthContextProvider } from './context/AuthContext';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
