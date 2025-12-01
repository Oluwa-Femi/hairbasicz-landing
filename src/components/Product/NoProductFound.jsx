import React from "react";
import EmptyState from "../../assets/searchEmptyIcon.svg";

function NoProductFound() {
  return (
    <div className="m-auto lg:my-[250px] xl:my-[250px] 2xl:my-[250px] py-[10px] px-[20px] 2xl:w-[1100px] lg:w-[800px] xl:w-[800px]">
      <div className="items-center text-center text-2xl ">
        <img className="mx-auto" src={EmptyState} alt="empty state" />
        <p className="text-[#1C1D1F] font-[Gilroy-Medium] text-[18px]">
          We couldn’t find what you’re looking for
        </p>
        <p className="text-[#868A91] font-[Gilroy-Regular] leading-5 text-[14px]">
          Try searching for more general terms or shop from the <br />{" "}
          categories above.
        </p>
      </div>
    </div>
  );
}

export default NoProductFound;
