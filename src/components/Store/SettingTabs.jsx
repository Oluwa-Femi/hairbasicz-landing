/**
 ** @name: SettingTabs
 *? @description: WRAPPER FOR PROFILE SETTING TABS
 */

import React from "react";
import EachSettingsTemp from "./EachSettingsTemp";
import SettingTabTemp from "./SettingTabTemp";
import { MainContentBody, MainContentFooter } from "./SettingContent";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ChangePasswordForm from "../Forms/ChangePasswordForm";
import { queryNotificationSetting } from "../../libs/useQueries/notifications.queries";
import { Spinner } from "@chakra-ui/react";
import useUpdateSettings from "../../hooks/Settings/useUpdateSettings.hooks";
import { fallbackChoice } from "../../utils/functions/settings/notification.helper";

const SettingTabs = () => {
  const { status, data: notificationSettings } = queryNotificationSetting();

  const { isLoading, setOpt, opt, handleChoice } = useUpdateSettings(
    status === "success" && notificationSettings,
  );

  return (
    <SettingTabTemp title="Settings">
      <div className="lg:mx-9 xsm:w-screen">
        <Tabs pos="relative" variant="unstyled">
          <TabList px="2.074rem">
            <Tab _selected={{ color: "#2922b3", fontWeight: "500" }}>
              <p className="text-[16px]">Change password</p>
            </Tab>
          </TabList>
          <TabPanel>
            <MainContentBody>
              <ChangePasswordForm />
            </MainContentBody>
          </TabPanel>
        </Tabs>
      </div>
    </SettingTabTemp>
  );
};

export default SettingTabs;
