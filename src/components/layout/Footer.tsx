import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">TravelBuddy</h3>
            <p>당신의 완벽한 여행 동행을 찾아드립니다.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">문의하기</h4>
            <div className="flex items-center space-x-2">
              <Mail size={18} />
              <span>support@travelbuddy.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={18} />
              <span>02-1234-5678</span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TravelBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;