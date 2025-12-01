/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import {
  inputStyle,
  inputContainerStyle,
} from "../../utils/styles/phoneNoInputStyle";
import Phone from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = Phone.default ? Phone.default : Phone;

const PhoneNumberInput = (props) => {
  const {
    title,
    secondTitle,
    changeInput,
    secondTitleColor,
    disabled,
    // className,
    field: { name, value },
    form: { setFieldValue },
    country,
    errorMessage,
  } = props;

  const [style] = useState(inputStyle);
  const [inputContainer, setInputContainer] = useState(inputContainerStyle);

  const onValueChange = (phoneNumber) => {
    setFieldValue(name, phoneNumber);
  };

  return (
    <div className="my-4">
      <div className="flex justify-between">
        <p className="mb-[6px] text-base font-[Gilroy-Medium] font-[500] leading-[20px]">
          {title}
        </p>
        <p
          onClick={changeInput}
          className={`text-[14px] font-[500] leading-[20px] ${secondTitleColor} cursor-pointer`}
        >
          {secondTitle}
        </p>
      </div>
      <PhoneInput
        inputStyle={style}
        containerStyle={inputContainer}
        onFocus={() =>
          setInputContainer({ ...inputContainer, border: "3px solid #2922b3" })
        }
        onBlur={() => {
          setInputContainer({ ...inputContainer, border: "1px solid #D0D5DD" });
        }}
        placeholder="Enter phone number"
        name={name}
        value={value}
        onChange={onValueChange}
        country={country}
        disabled={disabled}
        countryCodeEditable={false}
        enableSearch={true}
      />
      {
        <p className="mt-[5px] text-[13px] text-red-600">
          {value?.length > 3 && errorMessage}
        </p>
      }
    </div>
  );
};

export default PhoneNumberInput;
