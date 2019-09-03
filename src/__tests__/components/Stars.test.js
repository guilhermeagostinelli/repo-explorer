import React from "react";
import { create } from "react-test-renderer";
import Stars from "../../components/Stars";
import "jest-styled-components";

describe("<Stars />", () => {
  it("should match the snapshot", () => {
    const stars = create(<Stars />);
    expect(stars.toJSON()).toMatchSnapshot();
  });
});
