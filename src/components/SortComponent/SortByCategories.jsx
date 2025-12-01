/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/Categories/categoriesSlice";
import { useNavigate } from "react-router-dom";

function SortByCategory() {
  const AllCategories = useSelector(selectCategories);
  const navigate = useNavigate();

  return (
    <Accordion defaultIndex={[0]} allowMultiple className="pt-4 px-4">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              className="font-bold text-base font-[Gilroy-Bold]"
            >
              Browse Categories
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div className="overflow-scroll h-[240px]">
            {AllCategories?.data?.map((menu) => (
              <ul>
                <li
                  key={menu?.category_name}
                  onClick={() =>
                    navigate(
                      `/category/${menu?.category_name}/${menu?.category_reference}`,
                    )
                  }
                  className="text-[#1C1D1F] cursor-pointer hover:text-[#2922b3] capitalize text-[14px] font-normal list-none  py-[6px] px-5"
                >
                  {menu?.category_name}
                </li>
              </ul>
            ))}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default SortByCategory;
