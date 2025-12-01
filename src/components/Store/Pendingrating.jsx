import { MainContentBody } from "./SettingContent";
import SettingTabTemp from "./SettingTabTemp";

const PendingRatingComp = () => {
  return (
    <SettingTabTemp title="Pending Rating">
      <MainContentBody displayType="flex">
        <div className="">
          <div className="text-center hidden" id="empty-state">
            <h2 className="text-[1.25rem]">Pending Rating</h2>
          </div>
        </div>
      </MainContentBody>
    </SettingTabTemp>
  );
};

export default PendingRatingComp;
