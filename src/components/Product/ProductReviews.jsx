import React from "react";
import ReviewIcon from "../../assets/ProductReviewIcon.svg";
import StarRating from "../startRating/starRating";
import { getFirstLetters } from "../../utils/functions";

const ProductReviews = ({ productReviews }) => {
  return (
    <div className="mt-6 p-6 bg-white rounded-[8px] h-full max-h-[446px]  min-h-[446px] overflow-y-auto">
      <h1 className="font-[Gilroy-Bold] text-[20px]">Reviews</h1>
      {productReviews?.length === 0 ? (
        <div className="h-[100%] flex flex-col justify-center items-center text-center mt-24">
          <img src={ReviewIcon} alt="" />
          <h2 className="text-[16px] mt-[16px] font-[Gilroy-Bold]">
            No Reviews Yet
          </h2>
          <p className="text-[14px] mt-[4px]">
            All reviews on this product will be <br /> displayed here
          </p>
        </div>
      ) : (
        <div>
          {productReviews?.map((review, index) => (
            <div
              key={index}
              className="flex  justify-between items-start mt-[16px] pb-[16px] border-solid border-b-[1px] border-b-[#D8DCE2]"
            >
              <div className="flex">
                <div className="flex justify-center items-center rounded-full  bg-[#FFEEF6] text-black text-[20px] font-[600] font-[Gilroy-SemiBold] uppercase p-[8px] ">
                  {getFirstLetters(review?.customer_name)}
                </div>
                <div className="ml-[16px]">
                  <p className="text-[16px] font-[700] font-[Gilroy-Bold]">
                    {review?.customer_name}
                  </p>
                  <p className="text-[#5F6166] text-[16px] mt-1">
                    {review?.comment}
                  </p>
                </div>
              </div>
              <div className="flex">
                <StarRating rating={review?.rating} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
