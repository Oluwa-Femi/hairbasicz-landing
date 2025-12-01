import React from "react";
import { Button } from "../../components/Button/Button";
import { ServicesMenu } from "../../utils/MockData/service";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-white w-screen ">
      <div className="bg-white xsm:px-[16px] sm:px-[50px] px-[128px] py-[64px] ">
        <h1 className="text-center text-[#2F3133] font-[700px] font-[Gilroy-Bold] text-4xl xsm:text-3xl sm:text-3xl pb-[16px] mx-auto w-[484px] xsm:w-full sm:w-full">
          Get the best quality services on{" "}
          <span className="text-[#2922b3] font-[700px] font-[Gilroy-Bold]">
            Hairbasicz
          </span>
        </h1>
        <div className="flex flex-wrap pt-[50px] pb-[100px] w-full xsm:flex-col sm:flex-col">
          {ServicesMenu?.map((item, index) => (
            <div className="store-brands" key={index}>
              <div className="h-[194px] text-center m-[16px] xsm:h-full sm:h-full hover:shadow-lg p-[16px]">
                <img
                  className="items-center m-auto"
                  src={item?.img}
                  alt={item?.img}
                />
                <h3 className="text-black font-[Gilroy-Bold] pt-[20px] pb-[8px] text-xl font-semibold xsm:w-full">
                  {item?.name}
                </h3>
                <p className="text-[#5F6166] text-base pt-[5px] m-[auto] w-[325px] xsm:w-full sm:w-full">
                  {item?.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#2922b3] px-[100px] xsm:px-[16px] sm:px-[16px] py-[64px] text-center rounded-3xl shadow-[0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)]">
          <h1 className="text-[#FFFFFF] text-4xl xsm:text-3xl xsm:w-[100%] sm:text-3xl sm:w-[100%] pb-[16px] xsm:m-auto sm:m-auto">
            We have the best personal hair growth service around{" "}
          </h1>
          <p className="text-[#FFFFFF] text-lg  w-[617px] xsm:w-[100%] sm:w-[100%] md:w-[100%] m-auto pb-[35px]">
            Experience premium class quality service - 
            Excellent hair care and growth specialists.
          </p>
          <Button
            width={"w-[137px]"}
            height={"h-[48px]"}
            borderRadius={"rounded-[8px]"}
            backgroundColor={"bg-[#FFFFFF]"}
            fontSize={"text-[16px]"}
            fontWeight={"font-[600]"}
            label="Start Shopping"
            color={"text-[#2922b3]"}
            onClick={() => window.open("https://paystack.shop/hairbasicz-nigeria", "_blank", "noopener,noreferrer")}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
