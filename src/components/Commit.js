import React from "react";
import styled from "styled-components";
import Card from "./Card";
import H2 from "./H2";
import formatDateTime from "../util/formatDateTime";

// Extends Card styles.
const CommitCard = styled(Card)`
  ::before {
    content: "📝";
  }
`;

const Commit = ({ message, author, comitted_at, html_url }) => (
  <CommitCard>
    <H2 color="#117ed0">{message}</H2>
    <p>Author: {author}</p>
    <p>Committed at {formatDateTime(new Date(comitted_at))}</p>
    <p>
      <a href={html_url} rel="noopener noreferrer" target="_blank">
        See on GitHub
      </a>
    </p>
  </CommitCard>
);

export default Commit;
