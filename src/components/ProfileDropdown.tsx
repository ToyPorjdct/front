import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { memberInfo } from '../state/authState';
import { getMember } from '../services/AuthApi';

const ProfileDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 
  const [auth, setAuth] = useRecoilState(memberInfo); 
  
  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await getMember();
        setAuth({
          ...auth,
          nickname: response.result.nickname,
          profileImage: './assets/profile.png',
          email: response.result.email,
        });
      } catch (error) {
      }
    };

    fetchMemberInfo(); 
  }, [setAuth]);


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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 프로필 이미지와 드롭다운 화살표 */}
      <button
        onClick={handleDropdownToggle}
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
      >
        <img
          src={auth?.profileImage || '/default-profile.png'}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-sm">{auth.nickname}</span>
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
