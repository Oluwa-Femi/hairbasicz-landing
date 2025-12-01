/**
 * @name: ProfileModals
 * @description: Set of modals for profile page
 */

import React, { useEffect, useState } from "react";
import ModalComp from "../Modal/ModalComp";
import SelfieModal from "./SelfieModal";
import { useQueryClient } from "react-query";
import UpdateContact from "../Forms/UpdateContact";
import ProfileForm from "../Forms/ProfileForm";

const ProfileModals = ({
  isOpen, // current state for modal
  setIsOpen, // change state for modal
  single, // set item for pop-up
  list, // current state menu
  profile, // server side profile
}) => {
  const titleHelper = () => {
    return id?.name || "BVN Verification";
  };

  const [id, setId] = useState(single);
  const queryClient = useQueryClient();
  const [filledNum, setFilledNum] = useState();
  const [steps, setSteps] = useState(1);

  const handleGlobalBack = () => {
    if (steps <= 1) return setSteps(1);
    return setSteps(steps - 1);
  }

  useEffect(() => {
    setId(single);
    setSteps(1);
  }, [single]);

  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    if (!isDefault) {
      queryClient.invalidateQueries(["profile"]);
      setIsDefault(true);
    }
  }, [isDefault]);

  useEffect(() => {
    const num = list.filter((each) => each?.status !== null);
    setFilledNum(num.length);
  }, [list])

  return (
    <div>
      <ModalComp
        isBack={steps >= 2}
        isOpen={isOpen}
        handleBack={handleGlobalBack}
        setIsOpen={setIsOpen}
        title={titleHelper()}
      >
        <div id="modal-body">
          {/* status indicator for unfinished task/ tasks */}
          <div className="grid gap-2 grid-cols-7">
            {list && steps < 2 &&
              id?.id !== 1 &&
              list?.map((each, index) => (
                <div
                  key={index}
                  className={`h-2 w-[100%] rounded-xl ${
                    index < filledNum ? "bg-[#2922b3]" : "bg-[#EBEEF2]"
                  } `}
                />
              ))}
          </div>
          {id?.id === 8 && (
            <div id="id Cards" className="py-4">
              <SelfieModal setIsOpen={setIsDefault} />
            </div>
          )}
          {id?.id === 1 && (
            id?.status === null ? (<UpdateContact isUpdate setIsOpen={setIsDefault} profile={profile} />) : (<ProfileForm profile={profile} setIsOpen={setIsOpen} />))
          }
          </div> 
      </ModalComp>
    </div>
  );
};

export default ProfileModals;
