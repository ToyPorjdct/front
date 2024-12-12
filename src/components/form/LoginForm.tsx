import React, { useState } from 'react';
import { login, getMember } from '../../services/authApi';
import { useSetRecoilState } from 'recoil';
import { memberInfo } from '../../state/authState';
import { LoginFormType } from '../../types/LoginFormType';

const LoginForm: React.FC = () => {
  const [payload, setFormData] = useState<LoginFormType>({
    email: '',
    password: '',
  });

  const setAuthState = useSetRecoilState(memberInfo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginResponse = await login(payload);
      const memberResponse = await getMember(loginResponse.result);

      setAuthState({
        id: memberResponse.result.id,
        accessToken: loginResponse.result,
        nickname: memberResponse.result.nickname,
        profileImage: memberResponse.result.profileImage,
        email: memberResponse.result.email,
      });

      window.location.href = '/';
    } catch (error) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          이메일 주소
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={payload.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={payload.password}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            로그인 상태 유지
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            비밀번호를 잊으셨나요?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
