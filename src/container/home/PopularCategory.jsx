import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageLoader from "../../assets/loader.png";
import NoProduct from "../../components/Product/NoProduct";

function PopularCategory({ data }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  const PopularCategories = data?.popularCategories?.data ?? [];

  const handleNavigate = (menu) => {
    navigate(`/category/${menu?.name}/${menu?.reference}`, {
      state: {
        id: menu?.reference
      }
    });
  };

  return (
    <div className="bg-white w-[100%] overflow-auto h-full border-[0.5px] border-[#D8DCE2] border-solid rounded-lg">
      <div className="mt-4 flex justify-between px-[40px] py-[8px]">
        <h5 className="text-black text-xl font-[Gilroy-SemiBold]">
          Explore popular categories
        </h5>
      </div>
      <div className="flex pb-4 mt-2">
        <div className="w-[40px]"></div>
        <div className="w-[100%] overflow-x-scroll scrollbar-thin scrollbar-thumb-[#B5BAC2] scrollbar-thumb-rounded-[60px] scrollbar-track-[#F8F9FB] scrollbar-track-rounded-[60px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px]">
          {PopularCategories?.length > 0 ? (
            <div className="flex gap-7 grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-7 items-center justify-items-center">
              {PopularCategories?.map((menu, index) => (
                <button
                  onClick={() => handleNavigate(menu)}
                  key={index}
                  className="group mb-3 cursor-pointer"
                >
                  <div className="p-[7px] mb-3 hover:bg-white group-hover:border-r group-hover:border-[1px] group-hover:border-[#FDE68A] group-hover:border-solid group-hover:rounded-full">
                    <div className="p-[8px] bg-[#FFFAE8] group-hover:bg-[#FDE68A] rounded-full w-[128px] xsm:w-[86px] h-[128px] xsm:h-[86px] flex items-center justify-center overflow-hidden">
                      <img
                        src={isLoading ? imageLoader : menu.image}
                        alt="global-icon"
                        className="w-[70px] h-[100px] mt-[30px] object-cover"
                        onLoad={() => handleLoading()}
                      />
                    </div>
                  </div>
                  <h6 className="flex justify-center text-[#868A91] text-xs font-medium group-hover:underline">
                    {menu.name}
                  </h6>
                </button>
              ))}
            </div>
          ) : (
            <>
              {data?.isGettingSuccess && (
                <NoProduct title={"No Top Category Yet"} />
              )}
            </>
          )}
        </div>
        <div className="w-[40px]"></div>
      </div>
    </div>
  );
}

export default PopularCategory;
