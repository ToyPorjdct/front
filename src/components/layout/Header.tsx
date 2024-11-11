// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authState);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로그아웃 시 토큰 제거
    setIsLoggedIn(false); // 로그아웃 후 상태 업데이트
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">TravelBuddy</div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-blue-600">홈</Link></li>
            <li><Link to="/search" className="text-gray-600 hover:text-blue-600">동행 찾기</Link></li>
            <li><Link to="/plans" className="text-gray-600 hover:text-blue-600">여행 계획</Link></li>
            <li><Link to="/community" className="text-gray-600 hover:text-blue-600">커뮤니티</Link></li>
          </ul>
        </nav>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            로그아웃
          </button>
        ) : (
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
