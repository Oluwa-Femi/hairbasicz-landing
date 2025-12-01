import React from "react";
import SingleOrderHistoryPreview from "../../../container/AccountInformation/OrderHistory/SingleOrderHistoryPreview";
import AccountDetailShell from "../AccountDetailShell";

const SingleOrderHistory = () => {
  return (
    <div className="w-screen ">
      <AccountDetailShell children={<SingleOrderHistoryPreview />} />
    </div>
  );
};

export default SingleOrderHistory;
