import React from "react";
import { create } from "react-test-renderer";
import Commit from "../../components/Commit";
import "jest-styled-components";

jest.mock("../../components/Card", () => "div");
jest.mock("../../components/H2", () => "h2");
jest.mock("../../util/formatDateTime", () => jest.fn(date => `${date}`));

describe("<Commit />", () => {
  it("should match the snapshot", () => {
    const props = {
      message: "Update README.md",
      author: "Guilherme Agostinelli",
      comitted_at: "2019-08-23T16:20:36Z",
      html_url:
        "https://github.com/guilhermeagostinelli/levenshtein/commit/461fb0ec05e43120e2018bd5a18f461230b99512"
    };

    const commit = create(<Commit {...props} />);
    expect(commit.toJSON()).toMatchSnapshot();
  });
});
