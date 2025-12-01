import SingleMessage from "../../components/AccountInformation/SingleMessagePreview";
import AccountDetailShell from "./AccountDetailShell";

const Message = () => {
  return (
    <div className="w-screen ">
      <AccountDetailShell children={<SingleMessage />} />
    </div>
  );
};

export default Message;
