import React from "react";
import { create } from "react-test-renderer";
import UnorderedList from "../../components/UnorderedList";
import "jest-styled-components";

describe("<UnorderedList />", () => {
  it("should match the snapshot", () => {
    const unorderedList = create(<UnorderedList />);
    expect(unorderedList.toJSON()).toMatchSnapshot();
  });
});
