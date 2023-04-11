import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalNavbar from './components/GlobalNavbar';
//import Footer from ''

export default function App() {
    return (
        <div className='App'>
            <GlobalNavbar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
}