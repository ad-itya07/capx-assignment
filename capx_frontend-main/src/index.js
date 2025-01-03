import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Ensure you have this or replace it with your CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Uncomment this if you decide to use `reportWebVitals` in the future
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
