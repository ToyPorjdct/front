import React from 'react';
import SearchForm from './SearchForm';
import DestinationCard from './DestinationCard';
import TestimonialCard from './TestimonialCard';

const HomePage: React.FC = () => {
  const popularDestinations = [
    { id: 1, name: '일본', image: './assets/japan.jpg' },
    { id: 2, name: '캐나다', image: '/assets/canada.jpg' },
    { id: 3, name: '몽골', image: './assets/mongolia.jpeg' },
    { id: 4, name: '서울', image: '/assets/seoul.jpg' },
  ];

  const testimonials = [
    { id: 1, name: '김서연', text: 'TravelBuddy 덕분에 좋은 동행을 만나 잊지 못할 여행을 했어요!' },
    { id: 2, name: '이준호', text: '처음으로 혼자 여행을 가는 거라 걱정했는데, 좋은 친구들을 만나 즐거웠습니다.' },
    { id: 3, name: '박지민', text: '여행 계획을 세우는 것부터 현지에서의 활동까지, 모든 것이 완벽했어요.' },
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
        <h2 className="text-3xl font-bold mb-6">여행자들의 후기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;