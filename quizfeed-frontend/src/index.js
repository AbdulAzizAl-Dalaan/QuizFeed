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
import QuizMaker from './components/quiz/QuizMaker';

import Login from './components/account/Login';
import Register from './components/account/Register';
import ForgotPassword from './components/account/ForgotPassword';
import Home from './components/home/Home';
import Friends from './components/friends/Friends';
import Settings from './components/account/Settings';
import Messages from './components/friends/Messages';
import Profile from './components/account/Profile';
import MyAccount from './components/account/MyAccount';
import QuizList from './components/quiz/QuizList';

// import ProtectedRoutes from './ProtectedRoutes';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route path='/' element={<App/>}>
          {/* Default page: can make it home page when that's created -- <Route index element={ } /> */}
            <Route path='/' element={<Login />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='register' element={<Register />} />
            <Route path='home' element={<Home />} />
            <Route path='friends' element={<Friends />} />
            <Route path='friends/message/:username' element={<Messages />} />
            <Route path='myaccount' element={<MyAccount />} />
            <Route path='profile/:username' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
            <Route path='logout' element={<Login />} />
            <Route path='quiz/:id' element={<QuizDisplay />} />
            <Route path='quiz/:id/:result' element={<QuizResult />} />
            <Route path='quiz/:id/edit' element={<QuizMaker />} />
            <Route path='quiz/new' element={<QuizMaker />} />
            <Route path='quizlist' element={<QuizList />} />
          </Route>
      </Routes>
    </Router>
  </React.StrictMode>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
