import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">TravelBuddy</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-600 hover:text-blue-600">홈</a></li>
            <li><a href="/search" className="text-gray-600 hover:text-blue-600">동행 찾기</a></li>
            <li><a href="/plans" className="text-gray-600 hover:text-blue-600">여행 계획</a></li>
            <li><a href="/community" className="text-gray-600 hover:text-blue-600">커뮤니티</a></li>
          </ul>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">로그인</button>
      </div>
    </header>
  );
};

export default Header;