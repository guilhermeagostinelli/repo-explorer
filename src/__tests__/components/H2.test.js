import React from "react";
import { create } from "react-test-renderer";
import H2 from "../../components/H2";
import "jest-styled-components";

describe("<H2 />", () => {
  it("should match the snapshot when no color is specified", () => {
    const h2 = create(<H2 />);
    expect(h2.toJSON()).toMatchSnapshot();
  });

  it("should match the snapshot when a color is specified", () => {
    const h2 = create(<H2 color="blue" />);
    expect(h2.toJSON()).toMatchSnapshot();
  });
});
