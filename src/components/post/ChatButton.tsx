import React from 'react';
import { createChatRoom } from '../../services/chatApi';
import { useRecoilValue } from 'recoil';
import { memberInfo } from '../../state/authState';
import { useNavigate } from 'react-router-dom';

const ChatButton: React.FC<{ boardId: number }> = ({ boardId }) => {
  const auth = useRecoilValue(memberInfo);
  const navigate = useNavigate();

  const handleChatCreation = async () => {
    if (!auth) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const accessToken = auth.accessToken;
      const response = await createChatRoom(accessToken, boardId);
      if(response.status === 409) {
        navigate(`/chat`);
        return;
      }
      alert('채팅방이 생성되었습니다!');
      navigate(`/chat`);
    } catch (error) {
      alert('채팅방 생성에 실패했습니다.');
    }
  };

  return (
    <button
      className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={handleChatCreation}
    >
      채팅 하기
    </button>
  );
};

export default ChatButton;
