import React, { useState } from "react";
import ModalComp from "../Modal/ModalComp";

const ProfileComplete = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState();
  const handleOpenModal = (title = "", type) => {
    setIsOpen(true);
    setModalTitle(title);
    setModalType(type);
  };

  return (
    <div>
      <div id="modals">
        <ModalComp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={modalTitle}
          showCloseButton
        >
        </ModalComp>
      </div>
      </div>
  );
};

export default ProfileComplete;
