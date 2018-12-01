import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as bots from "./bots";

const BOTS = [
  { name: "User", action: undefined },
  { name: "Random", action: bots.randomMove },
  { name: "Stockfish WASM (Depth 10)", action: bots.stockFishJsWithDepth(10) },
  { name: "Stockfish WASM (Depth 20)", action: bots.stockFishJsWithDepth(20) },
  { name: "Stockfish JS (Depth 10)", action: bots.stockFishWasmWithDepth(10) },
  { name: "Stockfish JS (Depth 20)", action: bots.stockFishWasmWithDepth(20) }
];

ReactDOM.render(<App bots={BOTS} />, document.getElementById("root"));
