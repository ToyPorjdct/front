import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../state/authState';
import ProfileDropdown from '../ProfileDropdown';

const Header: React.FC = () => {
  const isLoggedIn = useRecoilValue(authState);

  const buttonClass = "text-gray-600 hover:text-blue-600 transition";

  return (
    <header className="bg-white shadow-none">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 로고*/}
        <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          TravelBuddy
        </Link>
        
        {/* 네비게이션*/}
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/plans" className={buttonClass}>여행 계획</Link></li>
            <li><Link to="/community" className={buttonClass}>커뮤니티</Link></li>
          </ul>
        </nav>

        {/* 드롭다운 */}
        <div className="flex items-center space-x-6">
          {isLoggedIn && (
            <button className={`relative ${buttonClass}`} aria-label="알림">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 11V6a5 5 0 0 1 10 0v5h1a1 1 0 0 1 1 1v1H2v-1a1 1 0 0 1 1-1h1ZM4 6a4 4 0 1 0 8 0v5H4V6Z"/>
              </svg>
              <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2"></span>
            </button>
          )}

          {/* 로그인 버튼*/}
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium transition">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
