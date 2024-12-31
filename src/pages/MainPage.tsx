// pages/MainPage.tsx
import React, { useEffect, useState } from 'react';
import PostCard from '../components/main/PostCard';
import DestinationCard from '../components/main/DestinationCard';
import { PostType } from '../types/PostType';
import { getPostList } from '../services/postApi';
import Banner from '../components/main/Banner';

const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const popularDestinations = [
    { id: 1, name: '일본', image: './assets/japan.jpg' },
    { id: 2, name: '캐나다', image: '/assets/canada.jpg' },
    { id: 3, name: '몽골', image: './assets/mongolia.jpeg' },
    { id: 4, name: '서울', image: '/assets/seoul.jpg' },
  ];

  const banners = [
    './assets/banner.png'
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
    <div className="container mx-auto px-4 py-2">
      <Banner banners={banners} />

      {/* 모집글 작성 */}
      <div className="mt-4 mb-8 text-center">
        <a
          href="/create-post"
          className="inline-block bg-blue-600 text-white text-xl font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
        >
          모집글 작성하기
        </a>
      </div>

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
