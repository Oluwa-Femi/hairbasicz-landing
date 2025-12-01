import React from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

const PopoverLoader = () => {
  return (
    <div>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </div>
  );
};

export default PopoverLoader;
