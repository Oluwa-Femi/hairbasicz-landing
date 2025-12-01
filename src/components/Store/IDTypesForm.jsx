import React from 'react';
import Input from "../Input/Input";
import { Button } from "@chakra-ui/react";

const IDTypesForm = (props) => {
    const {
        selected,
        handleInput,
        isValid,
        idNumber,
        handleUpload
    } = props
    return (
       <div>
            <div className="flex gap-2">
              <p>Enter your {selected?.title} Number</p>
            </div>
            <Input
              onChange={(val) => handleInput(val.target.value)}
            />
            <Button
              isDisabled={!isValid || !idNumber}
              onClick={handleUpload}
              my="3"
              color="white"
              w="100%"
              bgColor="green"
            >
              <p>Next</p>
            </Button>
          </div>
    );
};

export default IDTypesForm;
