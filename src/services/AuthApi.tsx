import axios from 'axios';
import api from './api';


export interface ApiResponse<T = any> {
  status: number;
  result: T;
  message: string;
}


/**
 * 회원가입
 */
export async function signup(email: string, password: string, nickname: string): Promise<ApiResponse> {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SEVER_URL}/auth/join`, { email, password, nickname });

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
    const response = await axios.post(`${process.env.REACT_APP_SEVER_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * 회원 정보 조회
 */
export async function getMember(token: string): Promise<ApiResponse> {
  try {
    const response = await api.get(`${process.env.REACT_APP_SEVER_URL}/member`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}



/**
 * 회원 정보 수정
 */
export async function updateMember(token: string, nickname: string): Promise<ApiResponse> {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_SEVER_URL}/member`,
      { nickname },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}



/**
 * Oauth2 토큰 검증
 */
export async function validateToken(): Promise<string | null> {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SEVER_URL}/oauth2/validate`,   {},
    { withCredentials: true }
  );
    return response.headers['authorization'];
  } catch (error) {
    return null;
  }
}