import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import RepoExplorer from "./RepoExplorer";
import CommitExplorer from "./CommitExplorer";
import NotFound from "./NotFound";

const Div = styled.div`
  text-align: center;
`;

const App = () => {
  return (
    <Div>
      <Router>
        <Switch>
          <Route exact path="/" component={RepoExplorer} />
          <Route path="/commits/:user/:repo" component={CommitExplorer} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Div>
  );
};

export default App;
