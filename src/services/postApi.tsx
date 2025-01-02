import axios from 'axios';
import api from './api';
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
 * 게시글 상세
 * @param id 게시글 ID
 */
export async function getPostDetail(boardId: number): Promise<ApiResponse> {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SEVER_URL}/board/${boardId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching post detail:', error);
    throw new Error(error?.message || 'An error occurred while fetching post detail');
  }
}


/**
 * 게시글 작성
 */
export async function createPost(token: string, payload: PostFormType): Promise<ApiResponse> {
  try {
    const response = await api.post(`${process.env.REACT_APP_SEVER_URL}/board`, payload, {
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
 * 게시글 삭제
 */

export async function deletePost(accessToken: string, boardId: number): Promise<ApiResponse> {
  try {
    const response = await api.delete(`${process.env.REACT_APP_SEVER_URL}/board/${boardId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

/**
 * 댓글 조회
 */
export async function getComments(boardId: number): Promise<ApiResponse> {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SEVER_URL}/board/${boardId}/comment`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    throw new Error(error.message);
  }
}