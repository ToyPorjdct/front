// src/api.ts
export interface ApiResponse {
    status: number;
    result: string;
    message: string;
  }
  
export async function signup(email: string, password: string, nickname: string): Promise<ApiResponse> {
  const response = await fetch('http://localhost:8080/auth/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, nickname }),
  });

  const data = await response.json();
  if (data.status === 409) {
    throw new Error('이미 사용 중인 이메일 입니다.');
  }

  return data;
  }
  
  export async function login(email: string, password: string): Promise<ApiResponse> {
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
  