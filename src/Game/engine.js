import Chess from "chess.js";

export const newGame = () =>
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const isNewGame = fen => fen === newGame();

export const isBlackTurn = fen => fen.split(" ")[1] === "b";

export const isWhiteTurn = fen => fen.split(" ")[1] === "w";

export const isCheck = fen => new Chess(fen).in_check();

export const isGameOver = fen => new Chess(fen).game_over();

export const isMoveable = (fen, from) =>
  new Chess(fen).moves({ square: from }).length > 0;

export const move = (fen, from, to) => {
  const game = new Chess(fen);
  const action = game.move({ from, to, promotion: "q" });
  return action && [game.fen(), action];
};

export const toPositions = fen => {
  const game = new Chess(fen);

  return game.SQUARES.reduce((positions, position) => {
    const piece = game.get(position);
    if (!piece) return positions;
    const type = piece.color === "w" ? piece.type.toUpperCase() : piece.type;
    return [...positions, `${type}@${position}`];
  }, []);
};
