// components/main/Banner.tsx
import React, { useEffect, useState } from 'react';

interface BannerProps {
  banners: string[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [banners.length]);

  return (
    <section className="mb-0 relative"> 
      <div className="overflow-hidden w-full h-90">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={banner}
                alt={`슬라이드 배너 ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
