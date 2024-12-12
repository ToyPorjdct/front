import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { memberInfo } from '../state/authState';
import { getMember } from '../services/authApi';  
import { validateToken } from '../services/authApi';

const OAuth2RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(memberInfo);

  useEffect(() => {
    validateToken()
      .then((token) => {
        if (!token) {
          console.error('토큰이 없습니다.');
          navigate('/login');
          return;
        }

        getMember(token)
          .then((memberResponse) => {
            setAuthState({
              id: memberResponse.result.id,
              accessToken: token,
              nickname: memberResponse.result.nickname,
              profileImage: memberResponse.result.profileImage,
              email: memberResponse.result.email,
            });
            navigate('/');
          })
          .catch((error) => {
            console.error('사용자 정보 가져오기 실패:', error);
            navigate('/login');
          });
      })
      .catch((error) => {
        console.error('토큰 검증 오류:', error);
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
