import Logo from "../../assets/logo.svg";
import {
  Products,
  Company,
  Legal,
  Others,
  SocialMediaIcons,
} from "../../utils/MockData/Footer";
import { Link } from "react-router-dom";

const StoreFooter = () => {
  return (
    <div>
      <div className="px-[128px] pt-[164px] bg-[#EBEEF2] xsm:px-[20px] sm:px-[20px]">
        <div className="grid grid-cols-6 xsm:grid-cols-2 sm:grid-cols-2 pb-[32px] border-solid border-b-[1px] border-b-[#D8DCE2]">
          <div className="col-span-2">
            <img src={Logo} alt="" />
          </div>
          <div>
            <p className="text-[#1C1D1F] font-[Gilroy-Bold] text-[14px] xsm:pt-[38px] sm:pt-[38px]">
              Products
            </p>
            <div>
              {Products.map((item, index) => (
                <Link
                  className="text-[#47494D] hover:text-[#2922b3] text-[14px] py-[16px] flex w-fit"
                  to={item.link}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#1C1D1F] font-[Gilroy-Bold] text-[14px] xsm:pt-[38px] sm:pt-[38px]">
              Company
            </p>
            <div>
              {Company.map((item, index) => (
                <Link
                  className="text-[#47494D] hover:text-[#2922b3] text-[14px] py-[16px] flex w-fit"
                  to={item.link}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#1C1D1F] font-[Gilroy-Bold] text-[14px] xsm:pt-[38px] sm:pt-[38px]">
              Legal
            </p>
            <div>
              {Legal.map((item, index) => (
                <Link
                  className="text-[#47494D] hover:text-[#2922b3] text-[14px] py-[16px] flex w-fit"
                  to={item.link}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#1C1D1F] font-[Gilroy-Bold] text-[14px] xsm:pt-[38px] sm:pt-[38px]">
              Others
            </p>
            <div>
              {Others.map((item, index) => (
                <Link
                  className="text-[#47494D] hover:text-[#2922b3] text-[14px] py-[16px] flex w-fit"
                  to={item.link}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-[32px] flex justify-between xsm:flex-col xsm:items-start sm:flex-col sm:items-start items-center">
          <p className="text-[14px] text-[#2922b3] ">
            ©2024 Hairbasicz. All rights reserved
          </p>
          <div className="flex space-x-[16px] xsm:pt-[24px] sm:pt-[24px]">
            {SocialMediaIcons.map((item, index) => (
              <a target="_black" href={item?.link} key={index}>
                <img alt={item} src={item.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-[16px] pb-[64px]">
          <p className="text-[12px] font-[Gilroy-Medium] xsm:w-[100%] sm:w-[100%] text-[#868A91]">
            Hairbasicz is a unique online retailer of consumer electronics. We
            provide quality and safe products with natural and safe sythetic 
            ingredients for the nourishment and nurturing of black hair.
            We are passionate about hair and scalp care as well as providing
             high quality products and unique merchandising that benefits 
             the consumer and community it serves. 
            We deliver our products and services in reliable and timely
            manner. We take pride in our careful sourcing of the safest 
            ingredients and materials, packaging and branding to provide 
            our customers with the best experience when they use the 
            Hairbasicz brand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreFooter;
