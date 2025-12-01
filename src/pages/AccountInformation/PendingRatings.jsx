import PendingRatingComp from "../../components/Store/Pendingrating";
import AccountDetailShell from "./AccountDetailShell";

const PendingRatings = () => {
  return (
    <div className="w-screen ">
      <AccountDetailShell children={<PendingRatingComp />} />
    </div>
  );
};

export default PendingRatings;
