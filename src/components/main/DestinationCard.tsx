import React from 'react';

interface DestinationProps {
  destination: {
    id: number;
    name: string;
    image: string;
  };
}

const DestinationCard: React.FC<DestinationProps> = ({ destination }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold">{destination.name}</h3>
      </div>
    </div>
  );
};

export default DestinationCard;