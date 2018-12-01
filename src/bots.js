import Chess from "chess.js";

export const randomMove = () => fen =>
  new Promise(res => {
    const moves = new Chess(fen).moves({ verbose: true });
    const { from, to } = moves[Math.floor(Math.random() * moves.length)];
    setTimeout(() => res({ from, to }), 500);
  });

const stockFishWorker = (file, action) => () => {
  const stockfish = new Worker(file);

  let resolver = null;

  stockfish.addEventListener("message", e => {
    const move = e.data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);
    if (move && resolver) {
      resolver({ from: move[1], to: move[2] });
      resolver = null;
    }
  });

  return fen =>
    new Promise(res => {
      resolver = res;
      stockfish.postMessage(`position fen ${fen}`);
      stockfish.postMessage(action);
    });
};

export const stockFishJsWithDepth = depth =>
  stockFishWorker("stockfish.js", `go depth ${depth}`);

export const stockFishWasmWithDepth = depth =>
  stockFishWorker("stockfish.wasm.js", `go depth ${depth}`);
