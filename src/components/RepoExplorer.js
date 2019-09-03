import React, { useState, useEffect, Fragment } from "react";
import UnorderedList from "./UnorderedList";
import ListItem from "./ListItem";
import SearchField from "./SearchField";
import SortField from "./SortField";
import Repo from "./Repo";
import { getRepos } from "../api/gitHub";

const RepoExplorer = () => {
  const [userQuery, setUserQuery] = useState("reactjs");
  const [repos, setRepos] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortType, setSortType] = useState("asc");

  useEffect(() => {
    // Get list of repositories by user.
    (async () => {
      try {
        setRepos(await getRepos(userQuery));
      } catch (err) {
        if (err.message !== "Not Found") {
          console.error(err);
          alert("Error fetching results from GitHub's API...");
        }
        setRepos([]);
      }
    })();
  }, [userQuery]);

  const orderedRepos = repos.sort((a, b) => {
    let t;
    if (typeof a[sortBy] === "string" && typeof b[sortBy] === "string")
      t = a[sortBy].localeCompare(b[sortBy]);
    else t = a[sortBy] > b[sortBy] ? 1 : -1;

    return t * (sortType === "asc" ? 1 : -1);
  });

  return (
    <Fragment>
      <h1>Repository Explorer</h1>
      <p>
        <SearchField
          label="Search by GitHub user:"
          value={userQuery}
          onChange={setUserQuery}
        />
      </p>
      <p>
        <SortField
          valueNamePairs={[
            { value: "name", name: "Name" },
            { value: "description", name: "Description" },
            { value: "created_at", name: "Creation date" },
            { value: "language", name: "Language" },
            { value: "stargazers_count", name: "Stars" }
          ]}
          sortByValue={sortBy}
          sortTypeValue={sortType}
          onChangeSortByCb={setSortBy}
          onChangeSortTypeCb={setSortType}
        />
      </p>
      <p>Showing {orderedRepos.length} repo(s)</p>
      <UnorderedList>
        {orderedRepos.map(r => (
          <ListItem key={r.id}>
            <Repo user={userQuery} {...r}></Repo>
          </ListItem>
        ))}
      </UnorderedList>
    </Fragment>
  );
};

export default RepoExplorer;
