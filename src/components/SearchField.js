import React from "react";
import Label from "./Label";

const SearchField = ({ label, value, onChange }) => (
  <Label>
    {label}
    <input
      type="search"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </Label>
);

export default SearchField;
