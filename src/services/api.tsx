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


  export async function getMyInfo(): Promise<ApiResponse> {
    const token = localStorage.getItem('token'); // 로그인 시 저장된 토큰 가져오기
    console.log(token);
  
    if (!token) {
      throw new Error('로그인 상태가 아닙니다.');
    }
  
    const response = await fetch('http://localhost:8080/member/my-info', {
      method: 'GET', // GET 메소드 사용
      headers: {
        'Authorization': `Bearer ${token}`, // 인증 헤더에 토큰 포함
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('회원 정보 조회 실패');
    }
  
    return response.json(); // 응답 데이터 반환
  }
  