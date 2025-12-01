import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
const DrawerComponent = ({ isOpen, onClose, btnRef, Header, Body, Footer }) => {
  return (
    <>
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            borderBottom={"1.5px solid #EBEEF2"}
            paddingBottom={"1.75rem"}
          >
            {Header}
          </DrawerHeader>

          <DrawerBody marginTop={"5px"}>{Body}</DrawerBody>

          <DrawerFooter>{Footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
