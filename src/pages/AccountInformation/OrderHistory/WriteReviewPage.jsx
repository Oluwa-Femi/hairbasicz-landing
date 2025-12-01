import React from "react";
import WriteAReview from "../../../container/AccountInformation/OrderHistory/WriteAReview";
import AccountDetailShell from "../AccountDetailShell";

const WriteReviewPage = () => {
  return (
    <div className="w-screen ">
      <AccountDetailShell children={<WriteAReview />} />
    </div>
  );
};

export default WriteReviewPage;
