import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { CommentType } from '../../types/CommentType';

const Comments: React.FC<{ comments: CommentType[], postAuthorId: number }> = ({ comments: initialComments, postAuthorId }) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
        댓글 ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center space-x-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <Send className="w-5 h-5 mr-2" />
            작성
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <img src={comment.author.profileImage} alt={comment.author.nickname} className="w-8 h-8 rounded-full" />
              <span className="font-semibold text-gray-800">{comment.author.nickname}</span>
              <span className="ml-2 text-sm text-gray-500">{comment.createdAt}</span>
              {comment.author.id === postAuthorId && (
              <span className="ml-2 text-xs text-red-500 border-2 border-red-500 rounded-full py-0.5 px-2 font-semibold">
              작성자
              </span>
            )}
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
