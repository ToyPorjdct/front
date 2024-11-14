// LogoutButton.tsx
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { memberInfo } from '../../state/authState';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const setAuth = useSetRecoilState(memberInfo);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null); 
    navigate('/');
  };


  return (
    <button
      onClick={handleLogout}
      className="block w-full px-4 py-2 text-red-500 hover:bg-red-100 text-left transition">
      로그아웃
    </button>
  );
};

export default LogoutButton;
