import ProfileComp from "../../components/Store/ProfileComp";
import AccountDetailShell from "./AccountDetailShell";

const Profile = () => {
  return (
    <div className="w-screen ">
      <AccountDetailShell children={<ProfileComp />} />
    </div>
  );
};

export default Profile;
