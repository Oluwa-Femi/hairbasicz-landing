import Logo from "../../assets/logo.svg";
import {
  Products,
  Company,
  Legal,
  Others,
  SocialMediaIcons,
} from "../../utils/MockData/Footer";
import { Link } from "react-router-dom";
import SupportInformation from "../SupportInformation/SupportInformation";

const Footer = () => {
  return (
    <div className="absolute">
      <SupportInformation />
      <div className="px-[20px] lg:px-[128px] xl:px-[128px] 2xl:px-[128px] pt-[64px] bg-[#1C1D1F]">
        <div className="grid grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 pb-[32px] border-solid border-b-[1px] border-b-[#47494D]">
          <div className="col-span-2">
            <img src={Logo} alt="" />
          </div>
          <div className="">
            <p className="text-white font-[Gilroy-Bold] text-[14px]">Company</p>
            <div>
              {Company.map((item, index) => (
                <Link
                  className="text-[#9DA1A8] text-[14px] py-[16px] flex w-fit"
                  to={item.link}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white font-[Gilroy-Bold] text-[14px]">
              Products
            </p>
            <div>
              {Products.map((item, index) => (
                <Link
                  className="text-[#9DA1A8] text-[14px] py-[16px] flex w-fit"
                  to={item.link}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white font-[Gilroy-Bold] text-[14px]">Legal</p>
            <div>
              {Legal.map((item, index) => (
                <Link
                  className="text-[#9DA1A8] text-[14px] py-[16px] flex w-fit"
                  to={item.link}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white font-[Gilroy-Bold] text-[14px]">Others</p>
            <div>
              {Others.map((item, index) => (
                <Link
                  className="text-[#9DA1A8] text-[14px] py-[16px] flex w-fit"
                  to={item.link}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-[20px] lg:pt-[32px] xl:pt-[32px] 2xl:pt-[32px] flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between space-y-5 lg:items-center xl:items-center 2xl:items-center">
          <p className="text-[14px] text-[#9DA1A8]">
            ©2024 Hairbasicz. All rights reserved
          </p>
          <div className="flex space-x-[16px]">
            {SocialMediaIcons.map((item, index) => (
              <a target="_black" href={item?.link} key={index}>
                <img alt={item} src={item.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-[16px] pb-[64px]">
          <p className="text-[12px] text-[#9DA1A8]">
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

export default Footer;
