import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authState';

const OAuth2RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(authState);

  const tokenRequest = async () => {
    try {
      const response = await fetch('http://localhost:8080/oauth2/validate', {
        method: 'POST',
        credentials: 'include',
      });

      const token = response.headers.get('Authorization');
      console.log('token', token);
      if (token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true); 
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during API request:', error);
      navigate('/login');
    }
  };

  tokenRequest();  // 렌더링 후 바로 API 호출

  return (
    <div>
      <h2>로그인 처리 중...</h2>
    </div>
  );
};

export default OAuth2RedirectPage;
