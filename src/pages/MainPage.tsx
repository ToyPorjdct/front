import React from 'react';
import SearchForm from '../components/SearchForm';
import DestinationCard from '../components/DestinationCard';
import PostCard from '../components/PostCard';

const HomePage: React.FC = () => {
  const popularDestinations = [
    { id: 1, name: '일본', image: './assets/japan.jpg' },
    { id: 2, name: '캐나다', image: '/assets/canada.jpg' },
    { id: 3, name: '몽골', image: './assets/mongolia.jpeg' },
    { id: 4, name: '서울', image: '/assets/seoul.jpg' },
  ];

  const latestPosts = [
    { id: 1, title: '2024년 여름, 일본 여행의 꿀팁!', content: '이번 여름에 일본을 여행하며 알게 된 꿀팁을 공유합니다...', author: '김서연' },
    { id: 2, title: '캐나다에서의 겨울 여행, 준비물 체크리스트', content: '겨울철 캐나다 여행을 준비할 때 필요한 모든 정보를 담았어요...', author: '이준호' },
    { id: 3, title: '서울에서의 즐거운 주말 여행', content: '서울에서 즐길 수 있는 주말 여행 코스를 소개합니다...', author: '박지민' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">당신의 완벽한 여행 동행을 찾아보세요</h1>
        <p className="text-xl mb-8">새로운 친구와 함께 잊지 못할 추억을 만들어보세요</p>
        <SearchForm />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">인기 여행지</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">최신 글</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
