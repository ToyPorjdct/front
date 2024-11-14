import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment } from '@fortawesome/free-solid-svg-icons';

interface Post {
  id: number;
  title: string;
  author: string;
  authorProfilePic: string;
  views: number;
  comments: number;
  deadline: string;
  tags: string[];
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 border border-gray-300">
      {/* 마감일 표시 */}
      <div className="text-sm text-gray-500 mb-2">
        <span>마감일 | {post.deadline}</span>
      </div>

      {/* 제목 */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
      
      {/* 여행지나라 태그 부분 */}
      <div className="mt-2">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-4 py-1 rounded-full border border-blue-300">
          여행나라
        </span>
      </div>

      {/* 추가적인 태그 부분 */}
      <div className="mt-2 flex flex-wrap space-x-2">
        {post.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-100 text-gray-800 text-sm px-4 py-1 rounded-full border border-gray-300">
            {tag}
          </span>
        ))}
      </div>

      {/* 작성자 정보, 조회수, 댓글 */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t border-gray-300 pt-4">
        <div className="flex items-center space-x-2">
          <img
            src={post.authorProfilePic}
            alt={post.author}
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <span className="font-semibold text-gray-900">{post.author}</span>
        </div>

        {/* 조회수와 댓글 수 */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon={faComment} className="mr-1" />
            <span>{post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
