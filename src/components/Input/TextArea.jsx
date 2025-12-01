/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Textarea } from "@chakra-ui/react";

const TextArea = (props) => {
  const {
    type,
    placeholder,
    onChange,
    name,
    id,
    errorMessage,
    width,
    height,
    borderRadius,
    fontSize,
    title,
    borderColor,
    textColor,
    secondTitle,
    secondTitleColor,
    changeInput,
    field,
    onBlur,
    onFocus,
    onKeyDown,
    onPaste,
    readOnly,
    pattern,
    testId,
    disabled,
    value,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-4 relative">
      <div className="flex justify-between">
        <p className="mb-[6px] text-base font-[Gilroy-Medium] font-[500] leading-[20px]">
          {title}
        </p>
        <p
          onClick={changeInput}
          className={`text-base font-[Gilroy-Medium] font-[500] leading-[20px] ${secondTitleColor} cursor-pointer`}
        >
          {secondTitle}
        </p>
      </div>
      <div className="relative">
        <Textarea
          onFocus={(field && field.onFocus) || onFocus}
          onChange={(field && field.onChange) || onChange}
          onBlur={(field && field.onBlur) || onBlur}
          defaultValue={(field && field.value) || value || ""}
          name={(field && field.name) || name}
          id={(field && field.name) || id}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          pattern={pattern}
          readOnly={readOnly}
          data-testid={testId}
          disabled={disabled}
          focusBorderColor="green.500"
          className={`!border-[1px] border-[#D0D5DD] ${borderColor} ${textColor} border-solid px-[16px] w-full ${width} ${height} ${borderRadius} ${fontSize}`}
        />
        {/* {inputType == "password" && (
          <FontAwesomeIcon
            onClick={togglePassword}
            className="text-[#8C8C8C] w-[20px] absolute top-[35%] right-[24px] cursor-pointer"
            icon={faEye}
          />
        )} */}
        {type === "password" && (
          <FontAwesomeIcon
            onClick={handleShowPassword}
            className="text-[#8C8C8C] w-[20px] absolute top-[35%] right-[24px] cursor-pointer"
            icon={faEyeSlash}
          />
        )}
        {/* {inputType == "text" &&
        (title == "Password" || title == "Confirm Password") ? (
          <FontAwesomeIcon
            onClick={togglePassword}
            className="text-[#8C8C8C] w-[20px] absolute top-[35%] right-[24px] cursor-pointer"
            icon={faEyeSlash}
          />
        ) : (
          ""
        )} */}
      </div>

      <p className="mt-[5px] text-[13px] text-red-600">{errorMessage}</p>
    </div>
  );
};

TextArea.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  title: PropTypes.string,
  secondTitle: PropTypes.string,
  secondTitleColor: PropTypes.string,
  errorMessage: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
};

TextArea.defaultProps = {
  width: "w-[378px]",
  height: "h-[48px]",
  type: "text",
  placeholder: "",
  borderRadius: "rounded-lg",
  fontSize: "text-[14px]",
  title: "",
  secondTitle: "",
  secondTitleColor: "",
  errorMessage: "",
};

export default TextArea;
