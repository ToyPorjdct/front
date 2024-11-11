import React from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.content.slice(0, 100)}...</p>
      <p className="text-sm text-gray-500">작성자: {post.author}</p>
    </div>
  );
};

export default PostCard;
