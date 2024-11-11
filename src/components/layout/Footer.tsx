import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">TravelBuddy</h3>
            <p className="text-gray-400">당신의 완벽한 여행 동행을 찾아드립니다.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">빠른 링크</h4>
            <ul>
              <li><a href="/about" className="text-gray-400 hover:text-white">회사 소개</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white">이용약관</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white">개인정보처리방침</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">문의하기</h4>
            <p className="text-gray-400">이메일: support@travelbuddy.com</p>
            <p className="text-gray-400">전화: 02-1234-5678</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; 2024 TravelBuddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;