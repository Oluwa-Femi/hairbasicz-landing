import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";
import React from "react";
import { Prices } from "../../utils/MockData";
import { Button } from "../Button/Button";
import Input from "../Input/Input";

function SortByPrice({
  onCustomPriceClick,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  priceValue,
  onChange
}) {
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
              Price
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div className="border-[0.5px] border-solid border-[#D8DCE2] rounded-lg h-full p-4">
            <div className="mt-1">
              {Prices.map((price, index) => (
                <RadioGroup key={index} onChange={onChange} value={priceValue}>
                  <Stack
                    className="mt-3"
                    spacing={20}
                    direction="column"
                    defaultChecked={false}
                  >
                    <div>
                      <Radio
                        colorScheme="green"
                        value={price.value}
                        size="md"
                        className=" text-sm font-[Gilroy-Medium]"
                      >
                        {price.name}
                      </Radio>
                    </div>
                  </Stack>
                </RadioGroup>
              ))}
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>

      <h2 className="font-bold text-base font-[Gilroy-Bold] ml-4 -mb-3">
        Custom price range
      </h2>
      <div className="flex items-center gap-2 mx-4">
        <div>
          <Input
            width={"w-full"}
            height={"h-[50px]"}
            type={"number"}
            placeholder="# Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <span> - </span>
        <div>
          <Input
            width={"w-full"}
            height={"h-[50px]"}
            type={"number"}
            placeholder="# Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <Button
          width={"w-[98px]"}
          height={"h-[50px]"}
          borderRadius={"rounded-[8px]"}
          backgroundColor={"bg-white"}
          label={"Go"}
          fontSize={"text-[16px]"}
          color={"text-[#2922b3]"}
          onClick={onCustomPriceClick}
        />
      </div>
    </Accordion>
  );
}

export default SortByPrice;
