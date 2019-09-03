import React from "react";
import { create } from "react-test-renderer";
import { shallow } from "enzyme";
import { Route } from "react-router-dom";
import "jest-styled-components";
import App from "../../components/App";
import RepoExplorer from "../../components/RepoExplorer";
import CommitExplorer from "../../components/CommitExplorer";
import NotFound from "../../components/NotFound";

jest.mock("../../components/RepoExplorer", () => "div");

describe("<App />", () => {
  it("should match the snapshot", () => {
    const app = create(<App />);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("renders routes correctly", () => {
    const wrapper = shallow(<App />);
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
    expect(pathMap["/"]).toBe(RepoExplorer);
    expect(pathMap["/commits/:user/:repo"]).toBe(CommitExplorer);
    expect(pathMap["undefined"]).toBe(NotFound);
  });
});
