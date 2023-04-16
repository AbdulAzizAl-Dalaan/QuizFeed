import React from 'react';
import { Outlet } from 'react-router-dom';
//import WebNavbar from '';
//import Footer from '';

export default function App() {
    return (
        <div className='App'>
            {/* <WebNavbar /> */}
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
}