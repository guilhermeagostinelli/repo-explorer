import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "jest-styled-components";
import setNativeValue from "../../util/setNativeValue";
import CommitExplorer from "../../components/CommitExplorer";

jest.mock("../../components/UnorderedList", () => "ul");
jest.mock("../../components/ListItem", () => "li");
jest.mock("../../components/Commit", () => "div");

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("<CommitExplorer />", () => {
  const mockCommits = [
    {
      sha: "461fb0ec05e43120e2018bd5a18f461230b99512",
      commit: {
        author: {
          name: "Guilherme Agostinelli",
          date: "2019-02-10T19:21:46Z"
        },
        message: "Update README.md"
      },
      html_url:
        "https://github.com/guilhermeagostinelli/levenshtein/commit/461fb0ec05e43120e2018bd5a18f461230b99512"
    },
    {
      sha: "f0f9ab135ad8c21f71c0023d68f43bc5a8b8a536",
      commit: {
        author: {
          name: "Guilherme Agostinelli",
          date: "2019-08-22T19:47:09Z"
        },
        message: "Fix unpredictable order of evaluation"
      },
      html_url:
        "https://github.com/guilhermeagostinelli/levenshtein/commit/f0f9ab135ad8c21f71c0023d68f43bc5a8b8a536"
    }
  ];

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(async () => ({
      ok: true,
      json: async () => mockCommits
    }));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const props = {
    match: {
      params: {
        user: "guilhermeagostinelli",
        repo: "levenshtein"
      }
    }
  };

  it("should render correctly", async () => {
    await act(async () => {
      render(<CommitExplorer {...props} />, container);
    });

    expect(container.getElementsByTagName("h1")).toHaveLength(1);
    expect(container.getElementsByTagName("h1")[0].textContent).toBe(
      "Commit Explorer"
    );
    expect(container.getElementsByTagName("label")).toHaveLength(1);
    expect(container.getElementsByTagName("label")[0].textContent).toBe(
      "Search by commit message:"
    );
    expect(container.getElementsByTagName("input")).toHaveLength(1);
    expect(container.getElementsByTagName("input")[0].value).toBe("");
    expect(container.getElementsByTagName("p")).toHaveLength(2);
    expect(container.getElementsByTagName("p")[1].textContent).toBe(
      "Showing 2 commit(s)"
    );
    expect(container.getElementsByTagName("ul")).toHaveLength(1);
    expect(container.getElementsByTagName("li")).toHaveLength(
      mockCommits.length
    );
    expect(container.getElementsByTagName("div")).toHaveLength(
      mockCommits.length
    );
    mockCommits.forEach((c, idx) => {
      const elem = container.getElementsByTagName("div")[idx];
      expect(elem.getAttribute("author")).toBe(c.commit.author.name);
      expect(elem.getAttribute("comitted_at")).toBe(c.commit.author.date);
      expect(elem.getAttribute("message")).toBe(c.commit.message);
      expect(elem.getAttribute("html_url")).toBe(c.html_url);
    });
  });

  it("should filter the commits when something is typed in the search field", async () => {
    await act(async () => {
      render(<CommitExplorer {...props} />, container);
    });

    expect(container.getElementsByTagName("div")).toHaveLength(
      mockCommits.length
    );

    const searchField = container.getElementsByTagName("input")[0];
    act(() => {
      setNativeValue(searchField, "f");
      searchField.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(container.getElementsByTagName("div")).toHaveLength(1);
    expect(
      container.getElementsByTagName("div")[0].getAttribute("author")
    ).toBe(mockCommits[1].commit.author.name);
    expect(
      container.getElementsByTagName("div")[0].getAttribute("comitted_at")
    ).toBe(mockCommits[1].commit.author.date);
    expect(
      container.getElementsByTagName("div")[0].getAttribute("message")
    ).toBe(mockCommits[1].commit.message);
    expect(
      container.getElementsByTagName("div")[0].getAttribute("html_url")
    ).toBe(mockCommits[1].html_url);
  });
});
