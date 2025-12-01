import { MainContentBody } from "./SettingContent";
import SettingTabTemp from "./SettingTabTemp";
import DeliveryIcon from "../../assets/DeliveryPackage.svg";
import ModalComp from "../Modal/ModalComp";
import EachAddress from "./EachAddress";
import CreateAddressForm from "../Forms/CreateAddressForm";
import UpdateAddressForm from "../Forms/UpdateAddressForm";
import DeleteAddressForm from "../Forms/DeleteAddress";
import {
  ModalTitle,
  shippingAddress,
} from "../../utils/functions/settings/address.helpers";
import { useUpdatePrimaryAddressUtlis } from "../../hooks/Settings/useAddress.hooks";
import { queryDeliveryAddress } from "../../libs/useQueries/notifications.queries";
import { Spinner } from "@chakra-ui/react";

const DeliveryAddressComp = () => {
  const { status, data: deliveryAddress, isFetching } = queryDeliveryAddress();
  const {
    handleUpdatePrimary,
    handleOpenAddress,
    handleDeleteAddress,
    handleOpenExisiting,
    isOpen,
    setIsOpen,
    modalId,
    addressData,
    isLoading,
  } = useUpdatePrimaryAddressUtlis();

  return (
    <SettingTabTemp
      title="Delivery Address"
      isNewAddress={shippingAddress(deliveryAddress)?.length === 1}
      setIsOpen={handleOpenAddress}
    >
      <ModalComp
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        showCloseButton
        title={ModalTitle(modalId)}
      >
        {modalId !== "#deleteType" && (
          <>
            {modalId === "#address" && (
              // add new address form
              <CreateAddressForm
                allAddress={deliveryAddress}
                isOpen={setIsOpen}
              />
            )}

            {/* // update address form */}
            {modalId === "#update" && (
              <UpdateAddressForm isOpen={setIsOpen} addressData={addressData} />
            )}
          </>
        )}

        {modalId === "#deleteType" && (
          <DeleteAddressForm setIsOpen={setIsOpen} addressType={addressData} />
        )}
      </ModalComp>
      <MainContentBody displayType="flex">
        <div className="">
          {shippingAddress(deliveryAddress)?.length === 0 && (
            <div className="text-center" id="empty-state">
              <img
                src={DeliveryIcon}
                alt="delivery_icon"
                className="mx-auto my-4"
              />
              <h2 className="text-[1.25rem]">
                You’ve not added a shipping address
              </h2>
              <p className="text-[#868A91] font-[0.8rem] my-4">
                Here you will be able to see all your addresses where we can we
                can deliver your goods to you.
              </p>
              <button
                onClick={handleOpenAddress}
                className="bg-[rgba(79,186,71,1)] minW-[115px] minH-[36px] p-3 mx-2 text-white rounded-md font-[Gilroy-Bold]"
              >
                Add a shipping address
              </button>
            </div>
          )}
          {(status === "loading" || isLoading || isFetching) && shippingAddress(deliveryAddress)?.length !== 0 && (
            <div className="h-full bg-white flex flex-col items-center justify-center gap-2">
              <h1 className="text-[18px] text-[#1C1D1F]">Please wait</h1>
              <Spinner size="xl" />
            </div>
          )}
          {status === "success" && !isLoading && !isFetching && deliveryAddress && (
            <div id="address_state">
              {Object.entries(deliveryAddress)
                ?.filter(([key, value]) => {
                  return value !== null;
                })
                ?.map(([key, each]) => (
                  <EachAddress
                    key={each}
                    data={each}
                    type={key}
                    onClickEdit={() => handleOpenExisiting(each, key)}
                    onClickPrimary={(data) => handleUpdatePrimary(data, key)}
                    onClickDelete={() => handleDeleteAddress(key)}
                  />
                ))}
            </div>
          )}
        </div>
      </MainContentBody>
    </SettingTabTemp>
  );
};

export default DeliveryAddressComp;
