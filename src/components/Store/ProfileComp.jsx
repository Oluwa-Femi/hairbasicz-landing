import { MainContentBody } from "./SettingContent";
import SettingTabTemp from "./SettingTabTemp";
import { Spinner } from "@chakra-ui/react";
import { QueryProfile } from "../../libs/useQueries/profile.queries";
import ProfileModals from "./ProfileModals";
import ProfileHeader from "./ProfileHeader";
import ProfileIncomplete from "./ProfileIncomplete";
import ProfileComplete from "./ProfileComplete";
import { findIncompleteStatus } from "../../hooks/Settings/useCompleteModal.hooks";
import useRegistration from "../../hooks/Settings/useRegistration.hooks";
import Storage from "../../utils/services/storage";
import useProfileStatus from "../../hooks/Settings/useMenu.hooks";

const ProfileComp = () => {
  const {
    status: profileStatus,
    data: profile,
    error,
  } = QueryProfile({ userEmail: Storage.get("user-email") });
  const { menu } = useProfileStatus(profile);
  const { autoSelected, openModal, isOpen, seleted, setIsOpen } =
    useRegistration({
      isTask: findIncompleteStatus(menu),
      menu,
      profile,
    });

  if (profileStatus === "error") return JSON.stringify(error);

  return (
    <SettingTabTemp title="Profile">
      <ProfileModals
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        single={seleted || autoSelected}
        list={menu}
        profile={profile}
      />

      {profileStatus === "loading" && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {profileStatus === "success" && (
        <MainContentBody displayType="flex">
          <div className="">
            {profile && (
              <ProfileHeader
                profile={profile}
                menu={menu}
                openModal={openModal}
              />
            )}
            <div className="py-4" id="empty-state">
              {profile &&
                menu.find((each) => each?.status === null) &&
                menu?.map((each, index) => (
                  <ProfileIncomplete
                    key={index}
                    each={each}
                    openModal={openModal}
                  />
                ))}
            </div>

            <div id="full-state">
              {profile && menu.every((each) => each?.status !== null) && (
                <ProfileComplete menu={profile} />
              )}
            </div>
          </div>
        </MainContentBody>
      )}
    </SettingTabTemp>
  );
};

export default ProfileComp;
