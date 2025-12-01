import React from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

const PageLoader = () => {
  return (
    <div className="w-full px-6 py-6">
      <Stack>
        <Skeleton bg="green.500" height="100px" />
        <Skeleton bg="green.500" height="100px" />
        <Skeleton bg="green.500" height="100px" />
        <Skeleton bg="green.500" height="100px" />
        <Skeleton bg="green.500" height="100px" />
        <Skeleton bg="green.500" height="100px" />
      </Stack>
    </div>
  );
};

export default PageLoader;
