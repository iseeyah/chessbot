import React from "react";
import styled from "styled-components";

export default styled(({ history, ...props }) => (
  <pre {...props}>
    {history
      .map(
        ({ piece, color, from, san }) =>
          `${color === "w" ? piece : piece.toUpperCase()}${from} ${san}`
      )
      .join("\n")}
  </pre>
))`
  width: 180px;
  height: 480px;
  overflow: scroll;
  float: left;
  padding: 10px;
  margin: 0;
`;
