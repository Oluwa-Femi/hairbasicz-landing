/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { IconsMenu } from "../../utils/MockData";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import imageLoader from "../../assets/loader.png";

function HomepageBody1(props) {
  const { banners } = props;
  const subHeaderBannerOne = banners?.data?.data?.sub_header_banner_one;
  const subHeaderBannerTwo = banners?.data?.data?.sub_header_banner_two;
  const Banner1 = banners?.data?.data?.header_banner_one;
  const Banner2 = banners?.data?.data?.header_banner_two;
  const Banner3 = banners?.data?.data?.header_banner_three;
  const Banner4 = banners?.data?.data?.header_banner_four;

  const BannerImages = [
    { img: Banner1 },
    { img: Banner2 },
    { img: Banner3 },
    { img: Banner4 }
  ];

  const newBannerImages = BannerImages.filter((object) => {
    return object.img !== null;
  });

  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  return (
    <div className="mb-10 w-full sm:px-5 xsm:px-5">
      <div className="hidden bg-white sm:grid md:grid lg:grid xl:grid 2xl:grid grid-cols-5  h-[116px] border-[0.5px] border-[#D8DCE2] border-solid rounded-lg content-center">
        {IconsMenu.map((menu) => (
          <div className="grid gap-1 justify-items-center border-r border-[#D8DCE2] border-solid">
            <span className="p-[8px] bg-[#EFFFED] rounded-full">
              <img src={menu.img} alt="global-icon" className="" />
            </span>
            <h4 className=" sm:text-center sm:text-sm md:text-center lg:text-center text-[#000] text-[14px] font-[Gilroy-SemiBold] font-[600]">
              {menu.name}
            </h4>
          </div>
        ))}
      </div>
      {newBannerImages?.length > 0 && (
        <div className="relative top-[2rem] xsm:h-[166px] sm:h-[166px] h-[314px] w-[100%]">
          <div className="flex justify-between gap-10 h-[314px]">
            <div className="w-[80%] xsm:w-[100%] sm:w-[100%]">
              <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={true}
                showThumbs={false}
                interval={5000}
                showArrows={false}
                width="100%"
              >
                {newBannerImages.map((banner) => (
                  <div className="defaultImage">
                    <img
                      loading="lazy"
                      src={isLoading ? imageLoader : banner.img}
                      alt="Banner"
                      className="xsm:h-[166px] sm:h-[166px] rounded-lg h-[314px] w-[852px] object-cover"
                      onLoad={() => handleLoading()}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="grid content-between xsm:hidden sm:hidden ">
              {subHeaderBannerOne !== null && (
                <div className="">
                  <img
                    loading="lazy"
                    src={isLoading ? imageLoader : subHeaderBannerOne}
                    alt="Banner"
                    className="w-[315px] h-[149px] rounded-lg"
                    onLoad={() => handleLoading()}
                  />
                </div>
              )}
              {subHeaderBannerTwo !== null && (
                <div className="h-[149px]">
                  <img
                    loading="lazy"
                    src={isLoading ? imageLoader : subHeaderBannerTwo}
                    alt="Banner"
                    className="w-[315px] h-[149px] rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomepageBody1;
