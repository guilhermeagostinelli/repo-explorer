import React from "react";
import { create } from "react-test-renderer";
import SearchField from "../../components/SearchField";
import "jest-styled-components";

describe("<SearchField />", () => {
  it("should match the snapshot", () => {
    const searchField = create(
      <SearchField label="Pesquisa:" value="" onChange={() => {}} />
    );
    expect(searchField.toJSON()).toMatchSnapshot();
  });

  it("should fire the callback function when the user types something in the search field", () => {
    const handleChange = jest.fn();
    const searchField = create(
      <SearchField label="Pesquisa:" value="" onChange={handleChange} />
    );
    const instance = searchField.root;
    const input = instance.findByType("input");
    input.props.onChange({ target: { value: "abc" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("abc");
  });
});
