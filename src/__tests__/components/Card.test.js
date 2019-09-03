import React from "react";
import { create } from "react-test-renderer";
import Card from "../../components/Card";
import "jest-styled-components";

describe("<Card />", () => {
  it("should match the snapshot", () => {
    const card = create(<Card />);
    expect(card.toJSON()).toMatchSnapshot();
  });
});
