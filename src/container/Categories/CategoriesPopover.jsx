/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PopoverLoader from "../../components/Loader/PopoverLoder";
import imageLoader from "../../assets/loader.png";

function CategoriesPopover({
  AllCategories,
  menu,
  handleCategoryClick,
  handleSubCategoryClick,
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };
  return (
    <div className="bg-white grid grid-cols-2 gap-5 w-[1150px] h-[350px] border-[0.5px] border-[#D8DCE2] border-solid rounded-lg p-9">
      <div className="border-[0.5px] border-[#D8DCE2] border-solid rounded-lg h-[280px] w-[100%]">
        {AllCategories?.isGettingAll ? (
          <>
            <PopoverLoader />
            <PopoverLoader />
            <PopoverLoader />
          </>
        ) : (
          <>
            <p
              key={menu?.category_reference}
              className="text-[#1C1D1F] font-[Gilroy-SemiBold] font-[700] text-[16px] cursor-pointer border-b-[0.5px] border-[#D8DCE2] py-2 pl-5 text capitalize"
              onClick={() => handleCategoryClick(menu)}
            >
              {menu?.category_name}
            </p>
            <div className="py-3 grid grid-cols-2 gap-1">
              {menu?.subcategories?.map((el) => (
                <li
                  key={el?.name}
                  onClick={() => handleSubCategoryClick(el)}
                  className="text-[#5F6166] cursor-pointer hover:text-[#2922b3] capitalize text-[14px] font-[500] font-[Gilroy-Medium] list-none py-[6px] px-5"
                >
                  {el?.name}
                </li>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="w-[100%] h-[280px] cursor-pointer">
        <img
          onClick={() => handleCategoryClick(menu)}
          src={isLoading ? imageLoader : menu?.category_image}
          alt="banner"
          className="h-[280px] w-full m-auto border rounded-[4px]"
          onLoad={() => handleLoading()}
        />
      </div>
    </div>
  );
}

export default CategoriesPopover;
