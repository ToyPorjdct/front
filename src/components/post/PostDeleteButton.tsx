import React from 'react';
import { useRecoilValue } from 'recoil';
import { memberInfo } from '../../state/authState';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../services/postApi';

const PostDeleteButton: React.FC<{ boardId: number }> = ({ boardId }) => {
  const navigate = useNavigate();
  const auth = useRecoilValue(memberInfo);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deletePost(auth.accessToken, boardId);
        alert('삭제가 완료되었습니다.');
        navigate('/');
      } catch (error) {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      삭제
    </button>
  );
};

export default PostDeleteButton;
