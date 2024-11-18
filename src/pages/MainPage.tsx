import React, { useEffect, useState } from 'react';
import PostCard from '../components/card/PostCard';
import DestinationCard from '../components/card/DestinationCard';
import SearchForm from '../components/form/SearchForm';
import { Post } from '../types/Post.d';
import { getPostList } from '../services/postApi';

const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const popularDestinations = [
    { id: 1, name: '일본', image: './assets/japan.jpg' },
    { id: 2, name: '캐나다', image: '/assets/canada.jpg' },
    { id: 3, name: '몽골', image: './assets/mongolia.jpeg' },
    { id: 4, name: '서울', image: '/assets/seoul.jpg' },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostList();
        if (response.status === 200) {
          setPosts(response.result);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error: any) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 검색 폼 */}
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">당신의 완벽한 여행 동행을 찾아보세요</h1>
        <p className="text-xl mb-8">새로운 친구와 함께 잊지 못할 추억을 만들어보세요</p>
        <SearchForm />
        
        {/* 모집글 작성 링크 - Styled button */}
        <div className="mt-8">
          <a
            href="/create-post"  // Set your route to the page where users can create a new post
            className="inline-block bg-blue-600 text-white text-xl font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            모집글 작성하기
          </a>
        </div>
      </section>

      {/* 인기 여행지 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">인기 여행지</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* 최신 글 */}
      <section>
        <h2 className="text-3xl font-bold mb-6">모집 글</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
