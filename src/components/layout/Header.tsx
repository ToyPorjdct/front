// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import Dropdown from '../ProfileDropdown'; // Dropdown 컴포넌트 임포트

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authState);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white shadow-none">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 로고 부분 */}
        <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          TravelBuddy
        </Link>
        
        {/* 네비게이션 메뉴 */}
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/plans" className="text-gray-600 hover:text-blue-600 transition">여행 계획</Link></li>
            <li><Link to="/community" className="text-gray-600 hover:text-blue-600 transition">커뮤니티</Link></li>
          </ul>
        </nav>

        {/* 로그인/로그아웃 텍스트 및 드롭다운 */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <Dropdown/> // 드롭다운 컴포넌트 사용
          ) : (
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 font-medium transition"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
