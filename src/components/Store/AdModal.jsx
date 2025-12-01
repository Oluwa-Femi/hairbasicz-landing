import React from "react";
import TextArea from "../Input/TextArea";
import { Button } from "@chakra-ui/react";

const AdModal = () => {
  return (
    <div>
      <h2 className="font-[Gilroy-Bold]">Enter your House Address</h2>
      <p className="font-[Gilroy-Medium] text-[14px] text-[#868A90]">
        Lorem ipsum dolor sit amet consectetur.{" "}
      </p>
      <TextArea placeholder="Enter your address" />
      <Button
        className="font-[Gilroy-Bold] mt-6"
        type="submit"
        width="100%"
        colorScheme="green"
      >
        Next
      </Button>
    </div>
  );
};

export default AdModal;
