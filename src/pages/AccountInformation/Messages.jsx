import MessagePreview from "../../components/AccountInformation/MessagePreview";
import AccountDetailShell from "./AccountDetailShell";

const Messages = () => {
  return (
    <div className="w-screen ">
      <AccountDetailShell children={<MessagePreview />} />
    </div>
  );
};

export default Messages;
