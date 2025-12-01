/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Product from "../../components/Product/Product";
import ArrowIcon from "../../assets/Iconly.svg";
import { useNavigate } from "react-router-dom";
import NoProduct from "../../components/Product/NoProduct";

function TopSelling({ data, isFetching }) {
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate(`/search/${"top-selling-items"}`, { state: data });
  };
  return (
    <div className="bg-white w-[100%] overflow-auto h-full border-[0.5px] border-[#D8DCE2] border-solid rounded-lg">
      <div className="flex justify-between bg-[#CDF2C9] px-[40px] py-[8px]">
        <h5 className="text-black text-xl font-[Gilroy-SemiBold]">
          Top selling items
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
              {data?.isGettingSuccess && <NoProduct title={"No Product Yet"} />}
            </>
          )}
        </div>
        <div className="w-[40px]"></div>
      </div>
    </div>
  );
}

export default TopSelling;
