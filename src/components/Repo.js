import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from "./Card";
import H2 from "./H2";
import Stars from "./Stars";
import formatDateTime from "../util/formatDateTime";

// Extends Card styles.
const RepoCard = styled(Card)`
  ::before {
    content: "📁";
  }
`;

const Repo = ({
  user,
  name,
  description,
  created_at,
  language,
  stargazers_count,
  html_url
}) => (
  <RepoCard>
    <H2>{name}</H2>
    <p>{description}</p>
    <p>Created at {formatDateTime(new Date(created_at))}</p>
    <p>Language: {language || "undetected"}</p>
    <Stars>{stargazers_count}</Stars>
    <p>
      <Link to={`/commits/${user}/${name}`}>See commits</Link>
    </p>
    <p>
      <a href={html_url} rel="noopener noreferrer" target="_blank">
        Go to GitHub
      </a>
    </p>
  </RepoCard>
);

export default Repo;
