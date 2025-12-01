import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const TabComponent = ({
  TabOneTitle,
  TabTwoTitle,
  TabThreeTitle,
  TabOnePanel,
  TabTwoPanel,
  TabThreePanel,
}) => {
  return (
    <div>
      <Tabs
        variant={"unstyled"}
        className="border-none rounded-none"
        colorScheme={"hsla(115, 40%, 46%, 1)"}
      >
        <TabList className="border-solid border-b-[1px] border-[#D8DCE2] text-[#868A90] text-[14px]">
          <Tab
            borderRadius={0}
            fontSize={["14px"]}
            className="border-none text-left"
            _selected={{ color: "#2922b3", borderBottom: "solid 2px #2922b3" }}
          >
            {TabOneTitle}
          </Tab>
          <Tab
            className="text-left"
            fontSize={["14px"]}
            borderRadius={0}
            _selected={{ color: "#2922b3", borderBottom: "solid 2px #2922b3" }}
          >
            {TabTwoTitle}
          </Tab>
          <Tab
            className="text-left"
            fontSize={["14px"]}

            borderRadius={0}
            _selected={{ color: "#2922b3", borderBottom: "solid 2px #2922b3" }}
          >
            {TabThreeTitle}
          </Tab>
        </TabList>

        <TabPanels marginTop={"24px"}>
          <TabPanel padding={"0px"} className="">
            {TabOnePanel}
          </TabPanel>
          <TabPanel padding={"0px"}>{TabTwoPanel}</TabPanel>
          <TabPanel>{TabThreePanel}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TabComponent;
