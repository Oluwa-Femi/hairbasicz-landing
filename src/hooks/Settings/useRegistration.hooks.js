/**
 * @name: useRegistration
 * @description: Hooks to determine the state of registrations and modal form states
 */

import { useEffect, useState } from "react";
import Storage from "../../utils/services/storage";
import { useNavigate } from "react-router-dom";

const useRegistration = ({
  isTask, // ? boolean to check task exist
  menu, // ? list of profile current status
  profile, // ? server side profile data
}) => {
  const navigate = useNavigate();
  const [seleted, setSeleted] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [autoSelected, setAutoSelected] = useState(null);

  const openModal = (each) => {
    if (each?.status === null) {
      setIsOpen(true);
      return setSeleted(each);
    }

    if (each?.id === 1 &&  menu.every((each) => each?.status !== null)) {
      setIsOpen(true);
      setSeleted(false);
      setAutoSelected(each);
    }
  };

  useEffect(() => {
    // opened and state changed mid session
    if (isOpen && isTask && menu.find((each) => each.id === seleted?.id)) {
      const current = menu.find((each) => each.id === seleted?.id);
      if (current.status !== null) {
        openModal(isTask);
      }
    }

    // opened and all tasks are completed
    if (isOpen && !isTask && !autoSelected) {
      setIsOpen(false);
      if (Storage.get("fromCartToProfilePage")) {
        navigate("/cart");
      }
    }
  }, [menu, isOpen, profile, seleted, isTask, autoSelected]);

  return {
    autoSelected,
    openModal,
    isOpen,
    seleted, // items to show in pop-up modal
    setIsOpen,
    setSeleted, // items when all tasks are completed
  };
};

export default useRegistration;
