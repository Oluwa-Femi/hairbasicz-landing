/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopoverLoader from "../../components/Loader/PopoverLoder";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../store/Categories/categoriesSlice";
import { getAllCategories } from "../../store/Categories/CategoriesActions";
import imageLoader from "../../assets/loader.png";

const AllCategoriesPopover = ({
  menuIndex,
  setMenuIndex,
  show,
  setShow,
  handleCategoryClick,
  handleSubCategoryClick,
}) => {
  const dispatch = useDispatch();
  const AllCategories = useSelector(selectCategories);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  const handleClick = (menu, index) => {
    setShow({
      index: index,
      open: !show.open,
    });
    setMenuIndex(menu);
    setActiveItemIndex(index);
  };
  useEffect(() => {
    setMenuIndex(AllCategories?.data[0]);
    setShow({
      open: !show.open,
    });
  }, []);

  useEffect(() => {
    dispatch(getAllCategories({ page: 1, limit: 100 }));
  }, []);

  return (
    <div className="bg-white flex gap-5 overflow-scroll w-[1360px] border-[0.5px] border-[#D8DCE2] border-solid rounded-lg px-6 py-10">
      <div className=" px-6 w-[20%] h-[380px] overflow-scroll">
        <p className="text-[#1C1D1F] font-[Gilroy-SemiBold] font-[700] cursor-pointer text-[16px] pb-[5px]">
          All Categories
        </p>
        {AllCategories?.data?.map((menu, index) => (
          <ul>
            <li
              onClick={() => handleClick(menu, index)}
              key={index}
              className="items-center text-[#1C1D1F] cursor-pointer hover:text-[#2922b3] gap-2 flex justify-between "
            >
              <p
                className={`${
                  activeItemIndex === index
                    ? "text-[#2922b3] hover:text-[#2922b3] font-[Gilroy-SemiBold]"
                    : "text-[#868A91]"
                } text-[14px] font-[Gilroy-Medium] font-[500] py-[10px]`}
                key={menu?.category_reference}
              >
                {menu?.category_name}
              </p>
              <FontAwesomeIcon
                className={`${
                  activeItemIndex === index
                    ? "text-[#2922b3] hover:text-[#2922b3] font-[Gilroy-SemiBold]"
                    : "text-[#868A91]"
                } text-[14px]  font-[300]`}
                icon={faAngleRight}
              />
            </li>
          </ul>
        ))}
      </div>
      {show.open && (
        <div className=" w-[80%] flex gap-6">
          <div className="border-[0.5px] border-[#D8DCE2] border-solid rounded-lg h-[260px] w-[50%]">
            {AllCategories?.isGettingAll ? (
              <>
                <PopoverLoader />
                <PopoverLoader />
                <PopoverLoader />
              </>
            ) : (
              <>
                <p
                  key={menuIndex?.category_name}
                  className="text-[#1C1D1F] font-[Gilroy-SemiBold] font-[700] cursor-pointer text-[16px] border-b-[0.5px] border-[#D8DCE2] py-2 pl-5"
                  onClick={() => handleCategoryClick(menuIndex)}
                >
                  {menuIndex?.category_name}
                </p>
                <div className="py-3 grid grid-cols-2 gap-1">
                  {menuIndex?.subcategories?.map((el) => (
                    <li
                      key={el?.name}
                      onClick={() => handleSubCategoryClick(el)}
                      className="text-[#5F6166] cursor-pointer hover:text-[#2922b3] capitalize text-[14px] font-[500] font-[Gilroy-Medium] list-none  py-[6px] px-5"
                    >
                      {el?.name}
                    </li>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="w-[50%] h-[260px] cursor-pointer">
            <img
              onClick={() => handleCategoryClick(menuIndex)}
              src={isLoading ? imageLoader : menuIndex?.category_image}
              alt="banner"
              className="h-[260px] min-w-[50%] w-full m-auto border rounded-[4px]"
              onLoad={() => handleLoading()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategoriesPopover;
