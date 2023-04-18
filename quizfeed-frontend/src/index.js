import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fontsource/montserrat';
import '@fontsource/montserrat/variable.css';
import '@fontsource/montagu-slab';
import '@fontsource/montagu-slab/variable.css';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
// Routing
import QuizDisplay from './components/quiz/QuizDisplay';
import QuizResult from './components/quiz/QuizResult';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          {/* Default page: can make it home page when that's created -- <Route index element={ } /> */}
          <Route path='quiz/:id' element={<QuizDisplay />} />
          <Route path='quiz/:id/:result' element={<QuizResult />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
