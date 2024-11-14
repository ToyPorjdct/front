import axios from 'axios';

export interface ApiResponse<T = any> {
  status: number;
  result: T;
  message: string;
}

const API_BASE_URL = 'http://localhost:8080';

/**
 * 회원가입
 */
export async function signup(email: string, password: string, nickname: string): Promise<ApiResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/join`, { email, password, nickname });

    if (response.data.status === 409) {
      throw new Error('이미 사용 중인 이메일 입니다.');
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * 로그인
 */
export async function login(email: string, password: string): Promise<ApiResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * 회원 정보 조회
 */
export async function getMember(): Promise<ApiResponse> {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${API_BASE_URL}/member`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * 회원 정보 수정
 */
export async function updateMember(nickname: string): Promise<ApiResponse> {
  const token = localStorage.getItem('token'); 

  try {
    const response = await axios.patch(`${API_BASE_URL}/member`, { nickname }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
