import React, { useState } from 'react';
import { User, MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  postId: number;
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ postId, comments: initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const comment: Comment = {
      id: comments.length + 1,
      author: '현재 사용자',
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment('');
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
              <User className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-semibold text-gray-800">{comment.author}</span>
              <span className="ml-2 text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;