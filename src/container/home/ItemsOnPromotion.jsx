/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Product from "../../components/Product/Product";
import ArrowIcon from "../../assets/Iconly.svg";
import { useNavigate } from "react-router-dom";
import NoProduct from "../../components/Product/NoProduct";

function ItemsOnPromotion(props) {
  const { data,isFetching } = props;
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate(`/search/${"items-on-promotions"}`, { state: data });
  };
  return (
    <div className="bg-white h-full border-[0.5px] border-[#D8DCE2] border-solid rounded-lg w-[100%] overflow-auto">
      <div className="flex justify-between bg-[#FEF3C7] px-[40px] py-[8px]">
        <h5 className="text-black text-xl font-[Gilroy-SemiBold]">
          Items on promotion
        </h5>
        <h5
          onClick={handleSeeAll}
          className="flex items-center gap-1 cursor-pointer text-[#2922b3] font-[Gilroy-SemiBold] text-[16px]"
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
          {data?.length > 0 ? (
            <div className="flex gap-2 w-fit overflow-x-scroll h-full">
              {data?.map((item, index) => (
                <Product menu={item} key={index} />
              ))}
            </div>
          ) : (
            <>
              {isFetching && <NoProduct title={"No Product Yet"} />}
            </>
          )}
        </div>
        <div className="w-[40px]"></div>
      </div>
    </div>
  );
}

export default ItemsOnPromotion;
