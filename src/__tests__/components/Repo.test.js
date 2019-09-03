import React from "react";
import { MemoryRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import Repo from "../../components/Repo";
import "jest-styled-components";

jest.mock("../../components/Card", () => "div");
jest.mock("../../components/H2", () => "h2");
jest.mock("../../util/formatDateTime", () => jest.fn(date => `${date}`));
jest.mock("../../components/Stars", () => "p");

describe("<Repo />", () => {
  const baseProps = {
    user: "guilhermeagostinelli",
    name: "levenshtein",
    description:
      "A Levenshtein Distance implementation using C++ with a dynamic programming approach.",
    created_at: "2019-08-22T13:03:22Z",
    stargazers_count: 0,
    html_url: "https://github.com/guilhermeagostinelli/levenshtein"
  };

  it("should match the snapshot when the programming language is detected", () => {
    const props = {
      ...baseProps,
      language: "C++"
    };
    const repo = create(
      <MemoryRouter>
        <Repo {...props} />
      </MemoryRouter>
    );
    expect(repo.toJSON()).toMatchSnapshot();
  });

  it("should match the snapshot when the programming language is not detected", () => {
    const props = {
      ...baseProps,
      language: null
    };
    const repo = create(
      <MemoryRouter>
        <Repo {...props} />
      </MemoryRouter>
    );
    expect(repo.toJSON()).toMatchSnapshot();
  });
});
