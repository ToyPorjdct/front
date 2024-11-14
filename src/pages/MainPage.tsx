import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment } from '@fortawesome/free-solid-svg-icons';
import PostCard from '../components/PostCard';
import DestinationCard from '../components/DestinationCard';
import SearchForm from '../components/form/SearchForm';

const HomePage: React.FC = () => {
  const popularDestinations = [
    { id: 1, name: '일본', image: './assets/japan.jpg' },
    { id: 2, name: '캐나다', image: '/assets/canada.jpg' },
    { id: 3, name: '몽골', image: './assets/mongolia.jpeg' },
    { id: 4, name: '서울', image: '/assets/seoul.jpg' },
  ];

  const latestPosts = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `여행 같이 가실분 구합니다~!!`,
    author: '닉네임',
    authorProfilePic: 'https://randomuser.me/api/portraits/men/1.jpg', 
    views: Math.floor(Math.random() * 1000), 
    comments: Math.floor(Math.random() * 100), 
    deadline: `2024-12-${Math.floor(Math.random() * 31) + 1}`, 
    tags: ['비흡연자', '성별전체'],
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 검색 폼 섹션 */}
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">당신의 완벽한 여행 동행을 찾아보세요</h1>
        <p className="text-xl mb-8">새로운 친구와 함께 잊지 못할 추억을 만들어보세요</p>
        <SearchForm />
      </section>

      {/* 인기 여행지 섹션 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">인기 여행지</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* 최신 글 섹션 */}
      <section>
        <h2 className="text-3xl font-bold mb-6">모집 글</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
