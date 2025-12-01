import React from "react";
import TickIcon from "../../assets/tickicon.svg";
import transferIcon from "../../assets/transferIcon.svg";
import VisaCard from "../../assets/visa.png";
import Mastercard from "../../assets/mastercard.png";
import Verve from "../../assets/verve.png";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

function CheckoutPaymentMethod(props) {
  const { paymentMethod, setPaymentMethod } = props;
  return (
    <div className="mt-6  bg-white w-[818px] 2xl:w-[1000px] py-[16px] rounded-[8px] border-[0.5px] border-solid border-[#D8DCE2]">
      <div className="pb-[16px] border-solid border-b-[1px] border-[#EBEEF2]">
        <div className="px-[24px]">
          <div className="flex items-center gap-[8px]">
            <img alt="icon" src={TickIcon} />
            <p className="text-[16px] font-[Gilroy-Medium]">Payment method</p>
          </div>
        </div>
      </div>
      <div className="px-[24px] mt-[16px]">
        <p className="text-[#868A90] text-[14px]">Select a payment method</p>
        <RadioGroup onChange={(e) => setPaymentMethod(e)} value={paymentMethod}>
          <div className="items-center justify-between px-[12px] py-[16px] border-solid border-[1px] rounded-[5px] border-[#D8DCE2] mt-[6px]">
            <div className="flex justify-between">
              <Stack
                // className="mt-3"
                spacing={20}
                direction="column"
                defaultChecked={false}
              >
                <div>
                  <Radio
                    colorScheme="green"
                    value={"card"}
                    size="md"
                    className=" text-[#868A91] text-[14px] font-[400] font-[Gilroy-Regular]"
                  >
                    Pay with Card
                  </Radio>
                </div>
              </Stack>
              <div className="flex items-center gap-[10px]">
                <img src={VisaCard} alt="Visa-Card" />
                <img src={Mastercard} alt="Master-Card" />
                <img src={Verve} alt="Verve-Card" />
              </div>
            </div>
          </div>
          <div className=" items-center px-[12px] py-[16px]  border-solid border-[1px] rounded-[5px] border-[#D8DCE2] mt-[16px] justify-between">
            <div className="flex justify-between">
              <Stack
                // className="mt-3"
                spacing={20}
                direction="column"
                defaultChecked={false}
              >
                <div>
                  <Radio
                    colorScheme="green"
                    value={"transfer"}
                    size="md"
                    className=" text-[#868A91] text-[14px] font-[400] font-[Gilroy-Regular]"
                  >
                    Pay via bank transfer
                  </Radio>
                </div>
              </Stack>
              <div>
                <img src={transferIcon} alt="SunTrust-Logo" />
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default CheckoutPaymentMethod;
