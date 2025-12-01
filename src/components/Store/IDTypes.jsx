import React from 'react';
import Note from "../../assets/note.svg";
import { ChevronRightIcon } from "@chakra-ui/icons";

const IDTypes = (props) => {
    const {
        handleSelectType,
        each,
    } = props
    return (
        <div
            role="button"
            onKeyDown={() => handleSelectType(each)}
            onClick={() => handleSelectType(each)}
            tabIndex={each?.id}
            style={{ borderBottom: "1px solid #EBEEF2" }}
            className="flex justify-between pt-6 pb-4 cursor-pointer"
            >
              <div className="flex gap-3">
                <img src={Note} alt="note-icon" />
                <p className="text-[16px] font-[Gilroy-Medium]">
                  {each?.title}
                </p>
              </div>
              <div>
                <ChevronRightIcon />
              </div>
            </div>
    );
};

export default IDTypes;
