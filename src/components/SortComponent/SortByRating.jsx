import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Rating } from "../../utils/MockData";
import { DynamicStar } from "react-dynamic-star";

function SortByRating({ onChange, ratingValue }) {

  return (
    <Accordion defaultIndex={[0]} allowMultiple className="pt-6 px-4">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              className="font-bold text-base font-[Gilroy-Bold]"
            >
              Rating
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div className="border-[0.5px] border-solid border-[#D8DCE2] rounded-lg h-full p-4">
            <div className="mt-1">
              {Rating.map((item, index) => (
                <RadioGroup key={index} onChange={onChange} value={ratingValue}>
                  <Stack
                    className="mt-3"
                    spacing={20}
                    direction="column"
                    defaultChecked={false}
                  >
                    <Radio
                      colorScheme="green"
                      value={item.value}
                      size="md"
                      className="text-sm font-[Gilroy-Medium]"
                    >
                      <div className="flex items-center">
                        <DynamicStar
                          rating={item.rating}
                          totalStars={5}
                          width={15}
                          height={15}
                          emptyStarColor={"transparent"}
                          outlined={true}
                        />
                        <span className="text-sm font-[Gilroy-Medium] ml-4">
                          & above
                        </span>
                      </div>
                    </Radio>
                  </Stack>
                </RadioGroup>
              ))}
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default SortByRating;
