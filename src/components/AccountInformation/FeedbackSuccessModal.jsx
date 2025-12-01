import React from "react";
import SuccessIcon from "../../assets/successIcon.svg";
import { Button } from "../Button/Button";
import ModalComp from "../Modal/ModalComp";

const FeedbackSuccessModal = ({ onClick, isOpen }) => {
  return (
    <ModalComp isOpen={isOpen}>
      <div className="text-center w-[300px] m-auto">
        <img src={SuccessIcon} alt="" className="m-auto" />
        <h2 className="text-[#17181C] font-[600] font-[Gilroy-Medium] text-[1.2em] my-[5px]">
          Thank you for your review{" "}
        </h2>
        <p className="text-[#747A8B] my-2">
          We appreciate you for leaving a honest feedback on this ordered item.{" "}
        </p>
        <div id="button">
          <Button
            disabled=""
            onClick={onClick}
            my="2"
            backgroundColor="bg-[#2922b3]"
            color="text-white"
            borderRadius={"rounded"}
            fontSize={"text-[14px]"}
            width={"w-[128px]"}
            fontWeight={"font-[600]"}
            paddingY={"py-[8px]"}
            paddingX={"px-[16px]"}
            label="Done"
          />
        </div>
      </div>
    </ModalComp>
  );
};

export default FeedbackSuccessModal;
