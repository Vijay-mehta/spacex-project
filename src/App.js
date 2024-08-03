import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Rockets from './components/Rockets';

const App = () => {
    return (
        <div className='    px-32 py-8  bg-[#f6f5f5]'>
        
        <Router >
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/rockets" element={<Rockets />} />
            </Routes>
        </Router>
        </div>
       
    );
};

export default App;
