import React from "react";
import Board from "react-chess";
import { toPositions } from "./engine";

export default ({ fen, ...props }) => (
  <Board pieces={toPositions(fen)} {...props} />
);
