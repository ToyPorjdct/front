// src/components/Signup.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await signup(email, password, nickname);
      // 토큰 저장 및 페이지 이동
      localStorage.setItem('token', response.token);
      navigate('/dashboard'); // 대시보드 페이지로 이동
    } catch (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="container">
      <h2>회원가입</h2>
      
      <div className="form-group">
        <label>이메일</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      
      <div className="form-group">
        <label>닉네임</label>
        <input 
          type="text" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
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
      
      <button onClick={handleSignup}>회원가입</button>
      <Link to="/login" className="link">이미 계정이 있으신가요? 로그인</Link>
    </div>
  );
};

export default Signup;
