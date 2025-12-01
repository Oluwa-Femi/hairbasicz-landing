import React from "react";
import BankAccountForm from "../Forms/BankAccountForm";

const BankAccount = ({ setIsOpen, isUpdate, currentData }) => {
  return (
    <BankAccountForm
      isUpdate={isUpdate}
      setIsOpen={setIsOpen}
      currentData={currentData}
    />
  );
};

export default BankAccount;
