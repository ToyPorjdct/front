import axios from 'axios';
import { ApiResponse } from '../types/ApiResponse.d';
  

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