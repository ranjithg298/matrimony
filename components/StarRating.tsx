import React from 'react';
import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, size = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            onClick={() => onRatingChange?.(starValue)}
            className={`w-${size} h-${size} ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            disabled={!onRatingChange}
          >
            <StarIcon
              className="w-full h-full"
              fill={starValue <= rating ? 'currentColor' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;