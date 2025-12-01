/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import MessageContent from "./MessageContent";
import EmptyContent from "./EmptyContent";
import useMessageStored from "../../hooks/Settings/useMessageStored.hooks";
import { QueryProfile } from "../../libs/useQueries/profile.queries";
import { Spinner } from "@chakra-ui/react";
import Storage from "../../utils/storage";

const SingleMessage = () => {
  const navigate = useNavigate();
  const { selected } = useMessageStored();
  const { status, data: profile } = QueryProfile({ userEmail: Storage.get("user-email") });



  return (
    <>
      <div className="flex justify-between items-center py-[16px] px-[24px] bg-white border-2">
        {status === 'loading' ? <Spinner /> : (
          <div className="flex gap-4 items-center">
            <a
              className="cursor-pointer hover:text-[green]"
              onClick={() => navigate(-1)}
            >
              <ChevronLeftIcon boxSize="2em" />
            </a>
            <h2 className="text-[16px] font-[Gilroy-Medium] text-[#1C1D1F]">
              Message centre
            </h2>
          </div>
        )}
      </div>

      {selected && selected?.body && (
        <MessageContent firstName={profile?.first_name} selected={selected} />
      )}

      {/* No notification message state */}
      {(!selected || !selected?.body) && <EmptyContent />}
    </>
  );
};

export default SingleMessage;
