import React from "react";
import { create } from "react-test-renderer";
import SortField from "../../components/SortField";
import "jest-styled-components";

describe("<SortField />", () => {
  const baseProps = {
    valueNamePairs: [
      { value: "name", name: "Name" },
      { value: "description", name: "Description" },
      { value: "created_at", name: "Creation date" },
      { value: "language", name: "Language" },
      { value: "stargazers_count", name: "Stars" }
    ],
    sortByValue: "name",
    sortTypeValue: "asc"
  };

  it("should match the snapshot", () => {
    const props = {
      ...baseProps,
      onChangeSortByCb: () => {},
      onChangeSortTypeCb: () => {}
    };

    const sortField = create(<SortField {...props} />);
    expect(sortField.toJSON()).toMatchSnapshot();
  });

  it("should fire the callback functions when the user changes the value of each of the select tags", () => {
    const handleChangeSortBy = jest.fn();
    const handleChangeSortType = jest.fn();
    const props = {
      ...baseProps,
      onChangeSortByCb: handleChangeSortBy,
      onChangeSortTypeCb: handleChangeSortType
    };
    const sortField = create(<SortField {...props} />);
    const instance = sortField.root;
    const selects = instance.findAllByType("select");
    selects[0].props.onChange({ target: { value: "description" } });
    expect(handleChangeSortBy).toHaveBeenCalledTimes(1);
    expect(handleChangeSortBy).toHaveBeenCalledWith("description");
    selects[1].props.onChange({ target: { value: "desc" } });
    expect(handleChangeSortType).toHaveBeenCalledTimes(1);
    expect(handleChangeSortType).toHaveBeenCalledWith("desc");
  });
});
