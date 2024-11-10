// src/api.ts
export interface AuthResponse {
    token: string;
  }
  
  export async function signup(email: string, password: string, nickname: string): Promise<AuthResponse> {
    const response = await fetch('http://localhost:8080/auth/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, nickname }),
    });
  
    if (!response.ok) throw new Error('회원가입 실패');
    return response.json();
  }
  
  export async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) throw new Error('로그인 실패');
    return response.json();
  }
  