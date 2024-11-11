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
          {/* 알람 아이콘 추가 */}
          <button className="relative text-gray-600 hover:text-blue-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 11V6a5 5 0 0 1 10 0v5h1a1 1 0 0 1 1 1v1H2v-1a1 1 0 0 1 1-1h1ZM4 6a4 4 0 1 0 8 0v5H4V6Z"/>
            </svg>
            {/* 알람 배지 (예: 새로운 알람이 있을 때 표시) */}
            <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {/* 로그인 상태에 따라 드롭다운 또는 로그인 버튼 표시 */}
          {isLoggedIn ? (
            <Dropdown /> // 드롭다운 컴포넌트 사용
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
