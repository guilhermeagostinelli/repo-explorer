import React from "react";
import { create } from "react-test-renderer";
import ListItem from "../../components/ListItem";
import "jest-styled-components";

describe("<ListItem />", () => {
  it("should match the snapshot", () => {
    const listItem = create(<ListItem />);
    expect(listItem.toJSON()).toMatchSnapshot();
  });
});
