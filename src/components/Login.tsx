// src/components/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      // 토큰 저장 및 페이지 이동
      localStorage.setItem('token', response.token);
      navigate('/dashboard'); // 대시보드 페이지로 이동
    } catch (error) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="container">
      <h2>로그인</h2>
      
      <div className="form-group">
        <label>이메일</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>비밀번호</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      
      <button onClick={handleLogin}>로그인</button>
      <Link to="/signup" className="link">계정이 없으신가요? 회원가입</Link>
    </div>
  );
};

export default Login;
