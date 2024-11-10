// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header';
import TravelMatch from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> {/* 메뉴바 추가 */}
      <Routes>
        <Route path="/" element={<TravelMatch />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  
  );
};

export default App;
