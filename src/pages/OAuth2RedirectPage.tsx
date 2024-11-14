import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { memberInfo } from '../state/authState';
import { getMember } from '../services/AuthApi';  // getMember 호출

const OAuth2RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(memberInfo);

  useEffect(() => {
    fetch('http://localhost:8080/oauth2/validate', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        const token = response.headers.get('Authorization');
        console.log('token', token);
        if (token) {
          localStorage.setItem('token', token);

          getMember()
            .then((memberResponse) => {
              setAuthState({
                accessToken: token,
                nickname: memberResponse.result.nickname,
                profileImage:'./assets/profile.png',
                email: memberResponse.result.email,
              });
              navigate('/');
            })
            .catch((error) => {
              console.error('사용자 정보 가져오기 실패:', error);
              navigate('/login');
            });
        } else {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Error during API request:', error);
        navigate('/login');
      });
  }, [navigate, setAuthState]);

  return (
    <div>
      <h2>로그인 처리 중...</h2>
    </div>
  );
};

export default OAuth2RedirectPage;
