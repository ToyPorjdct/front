// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Navbar from './components/layout/Header';
import OAuth2RedirectPage from './pages/OAuth2RedirectPage';
import Footer from './components/layout/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditProfilePage from './pages/EditProfilePage';
import MainPage from './pages/MainPage';
import CreatePost from './pages/CreatePost';
import PrivateRoute from './components/PrivateRoute';
import PostDetailPage from './pages/PostDetailPage';
import ChatPage from './pages/ChatPage';


const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectPage />} />
          <Route path="/settings" element={<PrivateRoute> <EditProfilePage /> </PrivateRoute>} />
          <Route path="/create-post" element={<PrivateRoute> <CreatePost /></PrivateRoute>} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
};

export default App;
