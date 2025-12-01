/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);
  const location = useLocation();

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`bg-transparent border-none outline-none cursor-pointer w-[20px]
              ${
                index <= (hover || rating) ? "text-[#FBBF24]" : "text-[#ccc]"
                // : "text-[#ccc]"
              }
            `}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
