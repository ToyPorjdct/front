import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Calendar, Users, MapPin } from 'lucide-react';

interface TravelPost {
  id: number;
  title: string;
  author: {
    name: string;
    profileImage: string;
  };
  createdAt: string;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  endDate: string;
  content: string;
  views: number;
  likes: number;
  tags: string[];
  image: string;
  destination: string;
}

interface TravelPostDetailProps {
  post: TravelPost;
}

const TravelPostDetail: React.FC<TravelPostDetailProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="relative mb-8">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">{post.title}</h1>
      </div>
      
      <div className="px-8 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img 
              src={post.author.profileImage} 
              alt={post.author.name} 
              className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
            />
            <div>
              <span className="block text-lg font-semibold text-gray-800">{post.author.name}</span>
              <span className="text-sm text-gray-500">{post.createdAt}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-600"><Eye className="w-5 h-5 mr-1" /> {post.views}</span>
            <span className="flex items-center text-gray-600"><Heart className="w-5 h-5 mr-1" /> {post.likes}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 flex items-center">
            <Calendar className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <span className="block text-sm font-medium text-gray-500">여행 기간</span>
              <span className="block text-lg font-semibold text-gray-800">{post.startDate} - {post.endDate}</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 flex items-center">
            <Users className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <span className="block text-sm font-medium text-gray-500">모집 인원</span>
              <span className="block text-lg font-semibold text-gray-800">{post.currentParticipants} / {post.maxParticipants}명</span>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 flex items-center">
            <MapPin className="w-8 h-8 text-yellow-500 mr-3" />
            <div>
              <span className="block text-sm font-medium text-gray-500">여행지</span>
              <span className="block text-lg font-semibold text-gray-800">{post.destination}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">여행 설명</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">태그</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition duration-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link 
            to="/travels" 
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            목록으로
          </Link>
          <button 
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            참가 신청
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelPostDetail;