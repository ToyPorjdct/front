import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberInfo } from '../../state/authState';
import ProfileDropdown from './ProfileDropdown';

const Header: React.FC = () => {
  const auth = useRecoilValue(memberInfo);
  const isLoggedIn = auth?.accessToken ? true : false;

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-none">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 로고 */}
        <div
          onClick={handleLogoClick}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer"
        >
          TravelBuddy
        </div>

        {/* 네비게이션 */}
        <nav className="relative z-20">
          <ul className="flex space-x-6">
            <li><Link to="/plans" className="text-gray-600 hover:text-blue-600 transition">여행 계획</Link></li>
            <li><Link to="/community" className="text-gray-600 hover:text-blue-600 transition">커뮤니티</Link></li>
          </ul>
        </nav>

        {/* 드롭다운 및 추가 버튼 */}
        <div className="flex items-center space-x-6 relative z-20">
          {isLoggedIn && (
            <>
              {/* 알림 버튼 */}
              <button className="text-gray-600 hover:text-blue-600 transition" aria-label="알림">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 11V6a5 5 0 0 1 10 0v5h1a1 1 0 0 1 1 1v1H2v-1a1 1 0 0 1 1-1h1ZM4 6a4 4 0 1 0 8 0v5H4V6Z" />
                </svg>
                {/* <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2"></span> */}
              </button>

              {/* 채팅 버튼 */}
              <Link to="/chat" className="text-gray-600 hover:text-blue-600 transition" aria-label="채팅">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                <path d="M4 2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v2.586a1 1 0 0 0 1.707.707L10.414 12H12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Z" />
                <path d="M7.146 7.146a.5.5 0 1 1 .708.708L7.707 8.5 9 9.793 8.146 10.5a.5.5 0 0 1-.708-.708L8.293 9.5 7 8.207 7.854 7.5Z" />
                <path d="M4.5 7a.5.5 0 0 1 .5.5v1A.5.5 0 0 1 4.5 9h-1A.5.5 0 0 1 3 8.5v-1a.5.5 0 0 1 .5-.5h1Z" />
                <path d="M12.5 7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1Z" />
              </svg>
            </Link>
            </>
          )}
          {/* 로그인 버튼 */}
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <a href='/login' className="text-blue-500 hover:text-blue-700 font-medium transition">
              로그인
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
