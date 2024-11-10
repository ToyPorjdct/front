import React from 'react';

interface TestimonialProps {
  testimonial: {
    id: number;
    name: string;
    text: string;
  };
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 mb-4">{testimonial.text}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
          {testimonial.name[0]}
        </div>
        <span className="font-semibold">{testimonial.name}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;