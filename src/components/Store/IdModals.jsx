/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import UploadDoc from "./UploadDoc";
import { identities } from "../../utils/MockData/identities";
import IDTypes from "./IDTypes";
import IDTypesForm from "./IDTypesForm";

const IdModals = (props) => {
  const {
    handleSelectType,
    handleInput,
    idNumber,
    isValid,
    isUpload,
    handleUpload,
    selected,
    setIsOpen,
  } = props;

  return (
    <div>
      <div id="identities">
        {!selected &&
          identities.map((each) => (
            <IDTypes
              handleSelectType={handleSelectType}
              each={each}
              key={each?.id}
              />
          ))}

        {selected && !isUpload && (
          <IDTypesForm
            selected={selected}
            handleInput={handleInput}
            isValid={isValid}
            idNumber={idNumber}
            handleUpload={handleUpload}
          />
        )}

        {selected && isUpload && (
          <UploadDoc
            idNumber={idNumber}
            idType={selected.type}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default IdModals;
