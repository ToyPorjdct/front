import axios from 'axios';
import { ApiResponse } from '../types/ApiResponse.d';
import { PostFormType } from '../types/PostFormType';
  

/**
 * 게시글 리스트 조회
 */
export async function getPostList(): Promise<ApiResponse> {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SEVER_URL}/board`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching post list:', error);
    throw new Error(error.message);
  }
}

/**
 * 게시글 작성
 */
export async function createPost(token: string, payload: PostFormType): Promise<ApiResponse> {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SEVER_URL}/board`, payload, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}