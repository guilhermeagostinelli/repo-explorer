import React, { useState, useEffect, Fragment } from "react";
import UnorderedList from "./UnorderedList";
import ListItem from "./ListItem";
import SearchField from "./SearchField";
import Commit from "./Commit";
import { getCommits } from "../api/gitHub";

const CommitExplorer = ({ match }) => {
  const user = match.params.user;
  const repo = match.params.repo;
  const [commitQuery, setCommitQuery] = useState("");
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    // Get list of commits by user and repo.
    (async () => {
      try {
        setCommits(await getCommits(user, repo, 1));
      } catch (err) {
        if (err.message !== "Not Found") {
          console.error(err);
          alert("Error fetching results from GitHub's API...");
        }
        setCommits([]);
      }
    })();
  }, [user, repo]);

  // Filters by commit message.
  const filteredCommits = commits.filter(c =>
    c.commit.message.toLowerCase().includes(commitQuery.toLowerCase())
  );

  return (
    <Fragment>
      <h1>Commit Explorer</h1>
      <p>
        <SearchField
          label="Search by commit message:"
          value={commitQuery}
          onChange={setCommitQuery}
        />
      </p>
      <p>Showing {filteredCommits.length} commit(s)</p>
      <UnorderedList>
        {filteredCommits.map(c => {
          const props = {
            author: c.commit.author.name,
            comitted_at: c.commit.author.date,
            message: c.commit.message,
            html_url: c.html_url
          };
          return (
            <ListItem key={c.sha}>
              <Commit {...props}></Commit>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Fragment>
  );
};

export default CommitExplorer;
