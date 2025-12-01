/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import Product from "./Product";
import ArrowIcon from "../../assets/Iconly.svg";
import { useNavigate } from "react-router-dom";
import NoProduct from "./NoProduct";

function ProductsYouMayLike(props) {
  const { productYouMayLike } = props;
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate(`/search/${"products-you-may-like"}`, {
      state: productYouMayLike
    });
  };
  return (
    <div className="bg-white mt-[24px] h-full border-[0.5px] border-[#D8DCE2] border-solid rounded-lg w-[100%] overflow-x-auto">
      <div className="flex justify-between bg-[#FEF3C7]  px-6 py-3 w-[100%] overflow-auto">
        <h5 className="text-black text-[20px] font-[Gilroy-Medium]">
          Products you may also like
        </h5>
        <h5
          onClick={handleSeeAll}
          className="flex items-center gap-1 cursor-pointer text-[#2922b3]"
        >
          See all
          <span>
            <img src={ArrowIcon} alt="arrow-icon" />
          </span>
        </h5>
      </div>
      <div className="flex pb-4">
        <div className="w-[40px]"></div>
        <div className="w-[100%] overflow-x-scroll h-[360px] pt-5 scrollbar-thin scrollbar-thumb-[#B5BAC2] scrollbar-thumb-rounded-[60px] scrollbar-track-[#F8F9FB] scrollbar-track-rounded-[60px]">
          {productYouMayLike?.length > 0 ? (
            <div className="flex gap-2 w-fit overflow-x-scroll h-full">
              {productYouMayLike?.map((item, index) => (
                <Product menu={item} key={index} />
              ))}
            </div>
          ) : (
            <NoProduct title={"No Product Yet"} />
          )}
        </div>
        <div className="w-[40px]"></div>
      </div>
    </div>
  );
}

export default ProductsYouMayLike;
