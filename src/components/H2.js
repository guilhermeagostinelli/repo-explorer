import styled from "styled-components";

const H2 = styled.h2`
  font-size: 1em;
  color: ${props => props.color || "black"};
`;

export default H2;
