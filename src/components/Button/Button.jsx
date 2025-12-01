import PropTypes from "prop-types";
import { Spinner } from "@chakra-ui/react";

export const Button = ({
  backgroundColor,
  label,
  color,
  width,
  height,
  borderRadius,
  borderColor,
  fontSize,
  paddingX,
  paddingY,
  fontWeight,
  onClick,
  type,
  marginTop,
  disabled,
  isloading,
  btnRef,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${backgroundColor} ${color} ${fontSize} ${width} ${borderRadius} ${height} ${fontWeight} ${marginTop} ${paddingY} ${paddingX} font-[Gilroy-Medium]  cursor-pointer border-[1px] border-solid ${borderColor}`}
      type={type}
      disabled={disabled}
      loading={isloading}
      ref={btnRef}
    >
      {isloading ? (
        <div className="flex items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        label
      )}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.any,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  height: PropTypes.any,
  isloading: PropTypes.string,
  label: PropTypes.any,
  marginTop: PropTypes.string,
  onClick: PropTypes.any,
  type: PropTypes.any,
  width: PropTypes.string,
  paddingX: PropTypes.string,
  paddingY: PropTypes.string,
};

Button.defaultProps = {
  backgroundColor: "bg-black",
  width: "w-[378px]",
  label: "Button",
  color: "text-white",
  fontSize: "text-[14px]",
  borderRadius: "rounded-sm",
  fontWeight: "font-[500]",
  onClick: undefined,
  marginTop: "my-2",
};
