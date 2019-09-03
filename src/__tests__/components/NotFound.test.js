import React from "react";
import { create } from "react-test-renderer";
import NotFound from "../../components/NotFound";

describe("<NotFound />", () => {
  it("should match the snapshot", () => {
    const notFound = create(<NotFound />);
    expect(notFound.toJSON()).toMatchSnapshot();
  });
});
