import React from "react";
import { Button } from "@chakra-ui/react";
import { useDeleteAddress } from "../../hooks/Settings/useAddress.hooks";

const DeleteAddressForm = ({ setIsOpen, addressType }) => {
  const { isLoading, handleDeleteAddress } = useDeleteAddress({
    addressType,
    setIsOpen,
  });

  return (
    <div className="text-center">
      <h2 className="text-[#17181C] font-[600] font-[Gilroy-Medium] text-[1.2em]">
        Delete Address?
      </h2>
      <p className="text-[#747A8B] my-2">
        Are you sure you want to delete this address?
      </p>
      <div id="button" className="">
        <Button
          disabled={isLoading}
          onClick={() => setIsOpen(false)}
          my="2"
          bgColor="green"
          textColor="white"
          w="100%"
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          onClick={handleDeleteAddress}
          my="2"
          textColor="red"
          variant="outline"
          colorScheme="red"
          w="100%"
        >
          Yes Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteAddressForm;
