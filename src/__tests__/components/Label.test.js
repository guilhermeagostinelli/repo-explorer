import React from "react";
import { create } from "react-test-renderer";
import Label from "../../components/Label";
import "jest-styled-components";

describe("<Label />", () => {
  it("should match the snapshot", () => {
    const label = create(<Label />);
    expect(label.toJSON()).toMatchSnapshot();
  });
});
