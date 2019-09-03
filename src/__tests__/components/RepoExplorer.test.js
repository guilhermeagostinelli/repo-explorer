import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "jest-styled-components";
import setNativeValue from "../../util/setNativeValue";
import RepoExplorer from "../../components/RepoExplorer";

jest.mock("../../components/UnorderedList", () => "ul");
jest.mock("../../components/ListItem", () => "li");
jest.mock("../../components/Repo", () => "div");

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

describe("<RepoExplorer />", () => {
  const mockReposReact = [
    {
      id: 170016618,
      user: "reactjs",
      name: "ar.reactjs.org",
      description: "(Work in progress) React documentation website in Arabic.",
      created_at: "2019-02-10T19:21:46Z",
      language: "JavaScript",
      stargazers_count: 43,
      html_url: "https://github.com/reactjs/ar.reactjs.org"
    },
    {
      id: 169659076,
      user: "reactjs",
      name: "az.reactjs.org",
      description:
        "(Work in progress) 🇦🇿 React documentation website in Azerbaijani.",
      created_at: "2019-02-07T23:28:42Z",
      language: "JavaScript",
      stargazers_count: 5,
      html_url: "https://github.com/reactjs/az.reactjs.org"
    }
  ];

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it("should render correctly", async () => {
    jest.spyOn(window, "fetch").mockImplementation(async () => ({
      ok: true,
      json: async () => [...mockReposReact]
    }));

    await act(async () => {
      render(<RepoExplorer />, container);
    });

    expect(container.getElementsByTagName("h1")).toHaveLength(1);
    expect(container.getElementsByTagName("h1")[0].textContent).toBe(
      "Repository Explorer"
    );
    expect(container.getElementsByTagName("label")).toHaveLength(2);
    expect(container.getElementsByTagName("label")[0].textContent).toBe(
      "Search by GitHub user:"
    );
    expect(container.getElementsByTagName("input")).toHaveLength(1);
    expect(container.getElementsByTagName("input")[0].value).toBe("reactjs");
    expect(container.getElementsByTagName("select")).toHaveLength(2);
    expect(container.getElementsByTagName("select")[0].value).toBe("name");
    expect(container.getElementsByTagName("select")[1].value).toBe("asc");
    expect(container.getElementsByTagName("p")).toHaveLength(3);
    expect(container.getElementsByTagName("p")[2].textContent).toBe(
      "Showing 2 repo(s)"
    );
    expect(container.getElementsByTagName("ul")).toHaveLength(1);
    expect(container.getElementsByTagName("li")).toHaveLength(
      mockReposReact.length
    );
    expect(container.getElementsByTagName("div")).toHaveLength(
      mockReposReact.length
    );
    mockReposReact.forEach((r, idx) => {
      const elem = container.getElementsByTagName("div")[idx];
      Object.keys(mockReposReact[idx]).forEach(a =>
        expect(elem.getAttribute(a)).toBe(r[a].toString())
      );
    });
  });

  it("should load the repos from the specified user when something is typed in the search field", async () => {
    jest.spyOn(window, "fetch").mockImplementation(async () => ({
      ok: true,
      json: async () => [...mockReposReact]
    }));
    await act(async () => {
      render(<RepoExplorer />, container);
    });
    expect(container.getElementsByTagName("div")).toHaveLength(
      mockReposReact.length
    );

    const mockReposGuilherme = [
      {
        id: 112253081,
        user: "guilhermeagostinelli",
        name: "AI-Pacman-Contest",
        description:
          "Implementation of a capture-the-flag variant of Pacman using Artificial Intelligence techniques.",
        created_at: "2017-11-27T21:54:56Z",
        language: "Python",
        stargazers_count: 1,
        html_url: "https://github.com/guilhermeagostinelli/AI-Pacman-Contest"
      }
    ];

    window.fetch.mockRestore();
    jest.spyOn(window, "fetch").mockImplementation(async () => ({
      ok: true,
      json: async () => mockReposGuilherme
    }));

    const searchField = container.getElementsByTagName("input")[0];
    await act(async () => {
      setNativeValue(searchField, "r");
      searchField.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(container.getElementsByTagName("div")).toHaveLength(
      mockReposGuilherme.length
    );
  });

  it("should sort the repos when the Order By value is changed", async () => {
    jest.spyOn(window, "fetch").mockImplementation(async () => ({
      ok: true,
      json: async () => [...mockReposReact]
    }));
    await act(async () => {
      render(<RepoExplorer />, container);
    });
    expect(container.getElementsByTagName("select")[0].value).toBe("name");
    mockReposReact.forEach((r, idx) =>
      expect(
        container.getElementsByTagName("div")[idx].getAttribute("name")
      ).toBe(r.name)
    );

    const sortField = container.getElementsByTagName("select")[0];
    await act(async () => {
      setNativeValue(sortField, "stargazers_count");
      sortField.dispatchEvent(new Event("change", { bubbles: true }));
    });
    [...mockReposReact]
      .reverse()
      .forEach((r, idx) =>
        expect(
          container.getElementsByTagName("div")[idx].getAttribute("name")
        ).toBe(r.name)
      );
  });

  it("should sort the repos accordingly if ascending/descending order is changed", async () => {
    jest.spyOn(window, "fetch").mockImplementation(async () => ({
      ok: true,
      json: async () => [...mockReposReact]
    }));
    await act(async () => {
      render(<RepoExplorer />, container);
    });
    expect(container.getElementsByTagName("select")[1].value).toBe("asc");
    mockReposReact.forEach((r, idx) =>
      expect(
        container.getElementsByTagName("div")[idx].getAttribute("name")
      ).toBe(r.name)
    );

    const sortField = container.getElementsByTagName("select")[1];
    await act(async () => {
      setNativeValue(sortField, "desc");
      sortField.dispatchEvent(new Event("change", { bubbles: true }));
    });
    mockReposReact
      .reverse()
      .forEach((r, idx) =>
        expect(
          container.getElementsByTagName("div")[idx].getAttribute("name")
        ).toBe(r.name)
      );
  });
});
