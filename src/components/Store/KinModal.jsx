import React from "react";
import KinForm from "../Forms/KinForm";

const KenModal = ({ setIsOpen, thirdParty, isUpdate, currentData }) => (
  <KinForm
    setIsOpen={setIsOpen}
    thirdPartyType={thirdParty}
    currentData={currentData}
    isUpdate={isUpdate}
  />
);

export default KenModal;
