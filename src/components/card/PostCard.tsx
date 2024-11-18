import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../types/Post.d';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 border border-gray-300">
      
      {/* 여행 날짜 표시 */}
      <div className="text-sm text-gray-500 mb-2">
        <span>
          여행 일정 | {post.startDate} ~ {post.endDate}
        </span>
      </div>

      {/* 제목 */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        <span className="block overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, minHeight: '3rem', lineHeight: '1.5rem' }}>
          {post.title}
        </span>
      </h3>
    
      {/* 목적지 */}
      <div className="mt-2">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-4 py-1 rounded-full border border-blue-300">
          {post.destination}
        </span>
      </div>

      {/* 태그 */}
      <div className="mt-2 flex gap-2" style={{ flexWrap: 'nowrap', overflow: 'hidden' }}>
        {post.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full border border-gray-300 text-center"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: '1 0 calc(33.333% - 0.5rem)',
              maxWidth: 'calc(33.333% - 0.5rem)',
            }}
          >
            {tag.length > 8 ? `${tag.slice(0, 8)}...` : tag}
          </span>
        ))}
      </div>

      {/* 모집인원 */}
      <div className="text-sm text-gray-500 mt-2 flex items-center justify-between">
        <div className={`text-xs py-1 px-3 rounded-full ${post.isClosed ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
          {post.isClosed ? '모집완료' : '모집중'}
        </div>
        <div className="flex items-center">
          <div className="text-lg font-bold text-blue-600 mr-2">
            {post.maxParticipant}명
          </div>
        </div>
      </div>

      {/* 작성자 정보 */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t border-gray-300 pt-4">
        <div className="flex items-center space-x-2 w-1/2">
          <img src={post.profileImage} alt='프로필 이미지' className="w-10 h-10 rounded-full border-2 border-gray-300"/>
          <span className="font-semibold text-gray-900">{post.nickname}</span>
        </div>

        {/* 조회수, 댓글 수 */}
        <div className="flex items-center space-x-4 w-1/2 justify-end">
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon={faComment} className="mr-1" />
            <span>{post.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
