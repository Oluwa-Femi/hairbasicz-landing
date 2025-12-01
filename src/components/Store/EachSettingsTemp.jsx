/**
 ** @name: EachSettingsTemp
 *? @description: TEMPLATE FOR EACH SETTINGS POD
 */

import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

const EachSettingsTemp = ({
  icon,
  title,
  subtitle,
  setOpt,
  id,
  opt,
  defaultValue,
}) => {
  const [notifiSetting, setNotifiSetting] = useState();

  const handleUpdate = (data) => {
    // set current notification settings
    setNotifiSetting(data);

    // format data into current data flow
    const currentData = [{ id, value: data }];

    const oldData = opt;
    // filter
    const filterData = oldData.filter(
      (each) => each?.id !== currentData[0]?.id,
    );
    // concate arrays
    setOpt([...filterData, ...currentData]);
  };

  return (
    <div id="each-setting" className="px-[1.2em] py-[1.2em] setting-lines">
      <img src={icon} alt={`${title} icon`} className="my-2" />
      <h2
        className="text-[1.2rem] font-[500] font-[Gilroy-Medium] text[#1C1D1F]"
        id="title"
      >
        {title}
      </h2>
      <p className="text-[0.833rem] line-[18px] text-[rgba(134,138,144,1)]">
        {subtitle}
      </p>
      <div className="flex gap-4 my-[0.694rem]">
        <RadioGroup
          onChange={(data) => handleUpdate(data)}
          value={notifiSetting || defaultValue}
        >
          <Stack direction="row">
            <Radio
              colorScheme="green"
              value="daily"
              textColor="#5F6166"
              label="Daily"
            >
              Daily
            </Radio>
            <Radio
              colorScheme="green"
              value="weekly"
              textColor="#5F6166"
              label="Weekly"
            >
              Weekly
            </Radio>
            <Radio
              colorScheme="green"
              value="monthly"
              textColor="#5F6166"
              label="Monthly"
            >
              Monthly
            </Radio>
          </Stack>
        </RadioGroup>
      </div>
    </div>
  );
};

export default EachSettingsTemp;
