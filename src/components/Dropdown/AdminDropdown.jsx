import React from "react";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const AdminDropdown = ({
  height,
  ButtonBackgroundColor,
  borderRadius,
  DropdownIconColor,
  Color,
  Label,
  handleClick,
  handleLogout,
}) => {
  return (
    <div>
      <Menu autoSelect={false}>
        <MenuButton
          _hover={{
            background: "#2922b3",
            color: "white",
          }}
          fontSize={"14px"}
          h={height}
          borderRadius={borderRadius}
          w={"fit"}
          color={Color}
          bg={ButtonBackgroundColor}
          as={Button}
          rightIcon={
            <ChevronDownIcon fontSize={"20px"} color={DropdownIconColor} />
          }
          borderWidth={"1px"}
          borderStyle={"solid"}
          borderColor={"#EBEEF2"}
        >
          {Label}
        </MenuButton>
        <MenuList px={"20px"} fontSize={"14px"}>
          <MenuItem
            onClick={handleClick}
            _hover={{
              background: "#2922b3",
              color: "white",
            }}
            mt={"12px"}
            fontFamily={"Gilroy-Regular"}
          >
            My Profile
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            _hover={{
              background: "#2922b3",
              color: "white",
            }}
            mt={"12px"}
            fontFamily={"Gilroy-Regular"}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default AdminDropdown;
