import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import JumbleEngine from './features/JumbleEngine/JumbleEngine.tsx';
import reportWebVitals from './reportWebVitals';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<JumbleEngine />} />
    </Routes>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
