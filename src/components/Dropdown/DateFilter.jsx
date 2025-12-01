import React from "react";
import { Menu, MenuButton, Button, MenuList } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateDropdown = ({
  height,
  ButtonBackgroundColor,
  borderRadius,
  Color,
  Label,
  handleFilterDateChange,
  ranges,
  showDatePicker,
  value,
}) => {
  return (
    <div>
      <Menu autoSelect={false}>
        <MenuButton
          fontSize={"14px"}
          h={height}
          borderRadius={borderRadius}
          w={"fit"}
          color={Color}
          bg={ButtonBackgroundColor}
          as={Button}
          rightIcon={<CalendarIcon color={"#868A91"} />}
          borderWidth={"1px"}
          borderStyle={"solid"}
          borderColor={"#EBEEF2"}
        >
          {Label}
        </MenuButton>
        <MenuList px={"20px"} fontSize={"14px"}>
          {showDatePicker && (
            <DateRange
              onChange={handleFilterDateChange}
              moveRangeOnFirstSelection={false}
              ranges={ranges}
              value={value}
              showDateDisplay
              dateDisplayFormat="MM-dd-yyyy"
              editableDateInputs={true}
              color="#2922b3"
              maxDate={new Date()}
            />
          )}
        </MenuList>
      </Menu>
    </div>
  );
};

export default DateDropdown;
