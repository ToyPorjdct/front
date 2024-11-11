
import LoginForm from '../components/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authState';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); 
  const setIsLoggedIn = useSetRecoilState(authState);



  useEffect(() => {
    const token = localStorage.getItem('token'); // 토큰이 있으면 이미 로그인된 상태
    if (token) {
      setIsLoggedIn(true); // 로그인 상태로 설정
      console.log('이미 로그인되어 있습니다.');
      navigate('/'); // 메인 페이지로 리다이렉트
    }
  }, [navigate, setIsLoggedIn]);


  
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  또는
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-center">
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">새 계정 만들기</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
