import SMSIcon from "../../assets/sms.png";
import TelephoneIcon from "../../assets/telephoneicon.png";
import ChatAndPhoneIcon from "../../assets/chatandtelephoneicon.png";
import Input from "../Input/Input";
import { Button } from "../Button/Button";
import AppleLogo from "../../assets/Applelogo.png";
import GooglePlayLogo from "../../assets/Googleplaylogo.png";
const SupportInformation = () => {
  return (
    <div className="bg-[#2F3133] px-[20px] space-y-[28px] lg:px-[128px] xl:px-[128px] 2xl:px-[128px] py-[24px] lg:flex xl:flex 2xl:flex justify-between items-center">
      <div>
        <p className="text-white text-[18px] font-[Gilroy-Bold]">
          Our support information
        </p>
        <div className="child:text-[#D8DCE2] text-[16px] mt-[16px] flex flex-col gap-[16px]">
          <div className="flex  items-center gap-[10px]">
            <img src={SMSIcon} alt="SMS-Icon" />
            <span className="font-[Gilroy-Medium]">support@hairbasicz.com</span>
          </div>
          <div className="flex sm:flex-col xsm:flex-col sm:items-start xsm:items-start items-center justify-center sm:space-x-0 xsm:space-x-0 space-x-4">
            <div className="flex sm:items-start xsm:items-start  items-center gap-[10px]">
              <img src={TelephoneIcon} alt="Telephone-Icon" />
              <p>
                <span className="font-[Gilroy-Medium]">+234 701 0650 553</span>
              </p>
            </div>
            <div className="flex sm:items-start xsm:items-start  items-center gap-[10px]">
              <img src={ChatAndPhoneIcon} alt="Chat&Telephone-Icon" />
              <span className="font-[Gilroy-Medium]">+234 701 0650 553</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportInformation;
