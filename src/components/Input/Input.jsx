/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Input = (props) => {
  const {
    type,
    placeholder,
    onChange,
    name,
    value,
    id,
    errorMessage,
    width,
    height,
    borderRadius,
    fontSize,
    title,
    secondTitle,
    secondTitleColor,
    changeInput,
    field,
    // form,
    onBlur,
    onFocus,
    onKeyDown,
    onPaste,
    readOnly,
    // emptyValue,
    pattern,
    testId,
    disabled,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleType = () => {
    if (type === "password" && !showPassword) {
      return "password";
    } else if (type !== "password" && !showPassword) {
      return type;
    }
  };

  // const errorCheck =
  //   form && form.touched[field.name] && form && form.errors[field.name];

  // const errorCheck2 = errorCheck && field.value !== "";

  // const resetValue = () => {
  //   emptyValue(field.name, "");
  // };

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
        <input
          type={handleType()}
          onFocus={(field && field.onFocus) || onFocus}
          onChange={(field && field.onChange) || onChange}
          onBlur={(field && field.onBlur) || onBlur}
          defaultValue={(field && field.value) || value || ""}
          disabled={disabled}
          name={(field && field.name) || name}
          id={(field && field.name) || id}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          pattern={pattern}
          readOnly={readOnly}
          data-testid={testId}
          className={`focus:outline-[#2922b3] border-[1px] border-[#D0D5DD] px-[16px] w-full ${width} ${height} ${borderRadius} ${fontSize}`}
        />
        {type === "password" && (
          <FontAwesomeIcon
            onClick={handleShowPassword}
            className="text-[#8C8C8C] w-[20px] absolute top-[35%] right-[24px] cursor-pointer"
            icon={showPassword ? faEye : faEyeSlash}
          />
        )}
      </div>

      <p className="mt-[5px] text-[13px] text-red-600">{errorMessage}</p>
    </div>
  );
};

Input.propTypes = {
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
};

Input.defaultProps = {
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

export default Input;
