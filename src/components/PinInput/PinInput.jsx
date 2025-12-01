import React, { useState } from "react";
import {
  PinInput as PinInputComponent,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import Storage from "../../utils/services/storage";

const PinInput = (props) => {
  const { sendVerify } = props;
  const [value, setValue] = useState("");
  Storage.set("otp", value);
  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      <HStack justify={"space-between"}>
        <PinInputComponent
          focusBorderColor="#2922b3"
          placeholder="-"
          value={value}
          onComplete={() => sendVerify()}
          onChange={(value) => handleChange(value)}
          // autoFocus={true}
          otp
        >
          <PinInputField w={"48px"} h={"48px"} />
          <PinInputField w={"48px"} h={"48px"} />
          <PinInputField w={"48px"} h={"48px"} />
          <PinInputField w={"48px"} h={"48px"} />
          <PinInputField w={"48px"} h={"48px"} />
          <PinInputField w={"48px"} h={"48px"} />
        </PinInputComponent>
      </HStack>
    </div>
  );
};

export default PinInput;
