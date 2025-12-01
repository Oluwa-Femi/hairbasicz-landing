import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const ReactSelect = ({
  placeholder,
  loading,
  isSearchable,
  onChange,
  options,
  name,
  value,
  isClearable,
  label,
  menuIsOpen,
  defaultValue,
  closeMenuOnSelect,
}) => {
  return (
    <div>
      <p className="mb-[6px] text-base font-[500] leading-[20px] font-[Gilroy-Medium]">
        {label}
      </p>
      <Select
        placeholder={placeholder}
        isLoading={loading}
        isSearchable={isSearchable}
        onChange={onChange}
        options={options}
        name={name}
        value={value}
        isClearable={isClearable}
        menuIsOpen={menuIsOpen}
        defaultValue={defaultValue}
        closeMenuOnSelect={closeMenuOnSelect}
      />
    </div>
  );
};
ReactSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.array,
  loading: PropTypes.bool,
  value: PropTypes.object,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  defaultValue: PropTypes.object,
  closeMenuOnSelect: PropTypes.bool,
};
export default ReactSelect;
