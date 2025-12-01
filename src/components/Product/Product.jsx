/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import imageLoader from "../../assets/loader.png";
import StarRating from "../startRating/starRating";

function Product(props) {
  const { menu } = props;
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/product/${id}`, {
      state: {
        id: id
      }
    });
  };
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  return (
    <div
      onClick={() => handleNavigate(menu?.reference)}
      key={menu?.reference}
      className="w-full min-h-[308px]  rounded-lg cursor-pointer  xsm:min-w-[160px] sm:min-w-[200px]  lg:min-w-[250px] xl:w-[270px] 2xl:w-[270px] 2xl:min-w-[270px] md:h-[306px] lg:h-[306px] xl:h-[306px] 2xl:h-[306px] border-[0.5px] 2xl:border-[1px] border-[#D8DCE2] border-solid hover:shadow-xl"
    >
      <div className="bg-[#F8F9FB]  rounded-lg">
        <div className="bg-[#F8F9FB] h-[180px] rounded-t-lg  p-5 flex items-center justify-center">
          <img
            src={isLoading ? imageLoader : menu?.picture || menu?.images?.[0]}
            alt="global-icon"
            className="h-full   rounded-t-lg"
            onLoad={() => handleLoading()}
          />
        </div>
      </div>
      <div className="m-4 grid gap-2">
        <div className="text-[#868A91] font-[Gilroy-Regular] font-[400] text-[16px] line-clamp-1 text-ellipsis">
          {menu?.name}
        </div>
        <div>
          <CurrencyFormat
            value={Number(menu?.amount)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦ "}
            className="text-[#000000] font-[Gilroy-Medium] font-[500] text-[16px] xl:text-[18px]"
          />
          <span className="text-[#000000] font-[Gilroy-Medium] font-[500] text-[12px]">
          </span>
        </div>
        <div className="flex">
          <StarRating rating={menu?.average_rating} />
        </div>
      </div>
    </div>
  );
}

export default Product;
