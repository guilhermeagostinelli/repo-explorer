import React from "react";
import Label from "./Label";

const SortField = ({
  valueNamePairs,
  sortByValue,
  sortTypeValue,
  onChangeSortByCb,
  onChangeSortTypeCb
}) => (
  <Label>
    Order by:
    <select
      value={sortByValue}
      onChange={e => onChangeSortByCb(e.target.value)}
    >
      {valueNamePairs.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
    <select
      value={sortTypeValue}
      onChange={e => onChangeSortTypeCb(e.target.value)}
    >
      <option value="asc">Ascending order</option>
      <option value="desc">Descending order</option>
    </select>
  </Label>
);

export default SortField;
