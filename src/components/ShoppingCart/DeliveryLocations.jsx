/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import TickIcon from "../../assets/tickicon.svg";
import LocationIcon from "../../assets/locationicon.svg";
import Dropdown from "../Dropdown/Dropdown";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { userInstorage } from "../../store/Cart/cartActions";

function DeliveryLocations(props) {
  const {
    locations,
    setLocations,
    dropdownList,
    shippingAdresses,
    userAddress,
    setUserAddress,
    address1,
    address2
  } = props;
  const navigate = useNavigate();

  return (
    <div className="md:px-[128px] lg:px-[128px] xl:px-[128px] 2xl:px-[128px]">
      <div className="mt-6  xsm:w-screen  2xl:w-[1100px] py-[16px] rounded-[8px] border-[1px] border-solid border-[#D8DCE2]">
        <div className="pb-[16px] border-solid border-b-[1px] border-[#EBEEF2]">
          <div className="px-[24px]">
            <div className="flex items-center gap-[8px]">
              <img src={TickIcon} alt="tick icon" />
              <p className="text-[16px]  font-[Gilroy-Medium]">
                Our Delivery Locations
              </p>
            </div>
          </div>
        </div>
        <div className="px-[24px] mt-[16px]">
          <p className="text-[#868A90] text-[14px] font-[400] mb-[16px]">
            Select the area closer to your delivery address
          </p>

          <Dropdown
            dropdownOption={locations}
            setDropdownOption={setLocations}
            dropdownList={dropdownList}
            dropdownTitle="Delivery Location"
            width="w-full"
            // errorMessage={location == "Select" && "Please choose a location"}
          />
        </div>
      </div>
      <div className="mt-6  bg-white xsm:w-screen 2xl:w-[1100px]  pt-[16px] rounded-[8px] border-[1px] border-solid border-[#D8DCE2]">
        <div className="pb-[16px] border-solid border-b-[1px] border-[#EBEEF2]">
          <div className="px-[24px] flex   items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <img alt="icon" src={TickIcon} />
              <p className="text-[16px] text-[#000000] font-[Gilroy-Medium]">
                Delivery address
              </p>
            </div>
            {shippingAdresses?.address1 && shippingAdresses?.address2 ? (
              <div
                onClick={() => navigate("/store/profile/delivery-address")}
                className="underline text-[14px] text-[#22C55E] cursor-pointer font-[Gilroy-Regular]"
              >
                Change delivery address
              </div>
            ) : (
              <div
                onClick={() => navigate("/store/profile/delivery-address")}
                className="underline text-[14px] text-[#22C55E] cursor-pointer font-[Gilroy-Regular]"
              >
                Add delivery address
              </div>
            )}
          </div>
        </div>
        <div className="px-[24px] my-6">
          <RadioGroup onChange={(e) => setUserAddress(e)} value={userAddress}>
            {shippingAdresses?.address1 && (
              <Stack className="mt-3" spacing={20} direction="column">
                <div>
                  <Radio
                    colorScheme={"green"}
                    value={address1}
                    size="md"
                    className=" text-[#868A91] text-[14px] font-[400] font-[Gilroy-Regular]"
                  >
                    {address1}
                  </Radio>
                </div>
              </Stack>
            )}
            {shippingAdresses?.address2 && (
              <Stack className="mt-3" spacing={20} direction="column">
                <div>
                  <Radio
                    colorScheme="green"
                    value={address2}
                    size="md"
                    className=" text-[#868A91] text-[14px] font-[400] font-[Gilroy-Regular]"
                  >
                    {address2}
                  </Radio>
                </div>
              </Stack>
            )}
          </RadioGroup>
        </div>
        {!shippingAdresses?.address1 && !shippingAdresses?.address2 && (
          <div className="min-h-[102px] grid place-items-center">
            <img alt="icon" src={LocationIcon} />
            <p className="text-[14px]">You have no delivery address,</p>
            <p className="text-[14px] mt-[-20px]">
              {userInstorage()
                ? "Go to your profile page to add a delivery address."
                : "Please login to add a delivery address on your profile page."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryLocations;
