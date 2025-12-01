import PropTypes from "prop-types";

export const Checkbox = ({
  width,
  height,
  label,
  disabled,
  checked,
  fontSize = "16px",
  textColor = "#2922b3",
  onChange,
}) => {
  return (
    <div className="flex items-center gap-[7.5px]">
      <input
        type="checkbox"
        disabled={disabled}
        defaultChecked={checked}
        className={`accent-[#2922b3] ${width} ${height} cursor-pointer`}
        onChange={onChange}
      ></input>
      <p
        className={`${
          disabled ? "text-[#9DA1A8]" : `text-[${textColor}]`
        } font-[400] text-[${fontSize}] text-[13.33px]`}
      >
        {label}
      </p>
    </div>
  );
};

Checkbox.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Checkbox.defaultProps = {
  width: "",
  height: "",
  label: "",
};
