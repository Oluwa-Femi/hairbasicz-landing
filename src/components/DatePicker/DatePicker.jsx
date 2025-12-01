import { Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

const DatePicker = ({
  width,
  height,
  title,
  errorMessage,
  name,
  id,
  onChange,
  field,
}) => {
  return (
    <div>
      <p className="text-[14px] font-[500]">{title}</p>
      <Input
        onFocus={field && field.onFocus}
        onBlur={field && field.onBlur}
        value={field && field.value}
        type={"date"}
        name={name}
        id={id}
        onChange={(field && field.onChange) || onChange}
        max={new Date()}
        mt={"6px"}
        focusBorderColor="#2922b3"
        borderColor="#D0D5DD"
        w={width}
        h={height}
      />
      <p className="mt-[5px] text-[13px] text-red-600">{errorMessage}</p>
    </div>
  );
};

DatePicker.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  errorMessage: PropTypes.string,
};

DatePicker.defaultProps = {
  width: "181px",
  height: "48px",
  title: "Date Picker",
  errorMessage: "",
};

export default DatePicker;
