// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Navbar from './components/layout/Header';
import TravelMatch from './pages/MainPage';
import OAuth2RedirectPage from './pages/OAuth2RedirectPage';
import Footer from './components/layout/Footer';
import Edi from './pages/EditProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditProfilePage from './pages/EditProfilePage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<EditProfilePage />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectPage />} />
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
};

export default App;
