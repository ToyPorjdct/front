import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../atoms/authState';

const ProfileDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 메뉴 상태
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 메뉴 참조
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authState);

  // 드롭다운 토글
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 드롭다운 외부 클릭 시 닫히게 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 프로필 이미지와 드롭다운 화살표 */}
      <button
        onClick={handleDropdownToggle}
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
      >
        <img
          src="./assets/profile.png" // 프로필 이미지 (여기에 실제 이미지 경로 사용)
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-sm">유저명</span> {/* 여기에도 실제 유저명을 넣을 수 있음 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path d="M1.5 5.5a.5.5 0 0 1 .708-.708L8 10.293l5.792-5.792a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6z"/>
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="space-y-2 p-2">
            <li>
              <Link
                to="/my-posts"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                내 작성글
              </Link>
            </li>
            <li>
              <Link
                to="/my-interests"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                내 관심글
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                설정
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-red-500 hover:bg-red-100 text-left transition"
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
