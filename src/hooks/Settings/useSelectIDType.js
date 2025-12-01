import { useEffect, useState } from "react";

const useSelectIDType = ({ setSteps, steps }) => {
  const [selected, setSeleted] = useState();
  const [idNumber, setIdNumber] = useState(undefined);
  const [isValid, setIsValid] = useState();
  const [isUpload, setIsUpload] = useState(false);
  const isNumber = (input) => /^[a-zA-Z]+$/.test(input);

  const handleSelectType = (data) => {
    setSeleted(data);
    setSteps(2);
};

    const handleInput = (val) => {

    setIdNumber(val);
    if (selected?.type === "NIN" && val?.length === 11 && !isNumber(val))
      return setIsValid(true);
    if (
      (selected?.type === "drivers-license" && val?.length === 12) ||
      (selected?.type === "voters-card" && val?.length === 19) ||
      (selected?.type === "international-passport" && val?.length === 9)
    )
      return setIsValid(true);

      return setIsValid(false);
    };

  const handleUpload = () => {
    setIsUpload(true);
    setSteps(3);
  }

  useEffect(() => {

    if (steps === 1 && selected) {
      setSeleted()
    }

    if (steps === 2 && isUpload && idNumber) {
      setIsValid(false);
      setIdNumber(undefined);
      setIsUpload(false);
    }

  }, [
    steps,
    selected,
    isUpload,
    idNumber,
  ])



    return {
        handleSelectType,
        handleInput,
        idNumber,
        isValid,
        isUpload,
        handleUpload,
        selected
    };
};

export default useSelectIDType;
