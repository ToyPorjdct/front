// src/api.ts
export interface ApiResponse<T = any> {
  status: number;
  result: T;
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


  export async function getMember(): Promise<ApiResponse> {
    const token = localStorage.getItem('token');
    console.log(token);
  
    if (!token) {
      throw new Error('로그인 상태가 아닙니다.');
    }
  
    const response = await fetch('http://localhost:8080/member', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('회원 정보 조회 실패');
    }
  
    return response.json();
  }


  export async function updateMember(nickname: string): Promise<ApiResponse> {
    const token = localStorage.getItem('token'); 
    console.log(token);
  
    if (!token) {
      throw new Error('로그인 상태가 아닙니다.');
    }
  
    const response = await fetch('http://localhost:8080/member', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname })
    });
  
    if (!response.ok) {
      throw new Error('회원 정보 수정 실패');
    }
  
    return response.json();
  }
  