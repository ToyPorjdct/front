import axios from 'axios';

/**
 * 채팅방 목록 조회
 */
export const getChatRooms = async (accessToken: string) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SEVER_URL}/chat`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch chat rooms');
  }
};

/** 
 * 이전 메시지 조회
 */
export const getPreMessages = async (accessToken: string, activeRoom: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SEVER_URL}/chat/room/${activeRoom}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch messages');
  }
};

