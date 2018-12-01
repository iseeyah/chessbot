import React, { Component } from "react";
import styled from "styled-components";

import Board from "./Board";
import History from "./History";
import * as engine from "./engine";

const BoardContainer = styled.div`
  width: 500px;
  float: left;
`;

const Controls = styled.div`
  width: 500px;
  margin: 20px auto 0;
  text-align: center;
`;

const Action = styled.button`
  margin-right: 10px;
`;

class Game extends Component {
  state = {
    isPlaying: false,
    fen: "",
    history: []
  };

  componentDidMount() {
    this.newGame();
  }

  newGame = () => {
    this.setState({
      isPlaying: false,
      fen: engine.newGame(),
      history: []
    });
  };

  async componentDidUpdate(prevState, prevProps) {
    const { fen, isPlaying } = this.state;
    const { white, black } = this.props;

    if (!isPlaying || this.hasBoardNotChanged(prevState, prevProps)) {
      return;
    }

    if (white && (engine.isWhiteTurn(fen) || engine.isNewGame(fen))) {
      const { from, to } = await white(fen);
      if (white === this.props.white) {
        this.doMove(from, to);
      }
    }

    if (black && engine.isBlackTurn(fen)) {
      const { from, to } = await black(fen);
      if (black === this.props.black) {
        this.doMove(from, to);
      }
    }
  }

  hasBoardNotChanged = (prevState, prevProps) =>
    this.state.isPlaying === prevState.isPlaying &&
    this.state.fen === prevState.fen &&
    this.props.white === prevProps.white &&
    this.props.black === prevProps.black;

  onMovePiece = (_, from, to) => {
    this.doMove(from, to);
  };

  doMove = (from, to) => {
    const moved = engine.move(this.state.fen, from, to);
    if (moved) {
      const [fen, action] = moved;

      if (engine.isGameOver(fen)) {
        global.confirm("We have a winner!");
        this.newGame();
        return;
      }

      this.setState({ fen, history: [...this.state.history, action] });
    }
  };

  onDragStart = (_, from) => {
    const { fen, isPlaying } = this.state;
    const { white, black } = this.props;

    return (
      isPlaying &&
      engine.isMoveable(fen, from) &&
      ((!white && engine.isWhiteTurn(fen)) ||
        (!black && engine.isBlackTurn(fen)))
    );
  };

  togglePlay = () => {
    this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }));
  };

  render() {
    return (
      <div className={this.props.className}>
        <BoardContainer>
          <Board
            fen={this.state.fen}
            onDragStart={this.onDragStart}
            onMovePiece={this.onMovePiece}
          />
          <Controls>
            <Action onClick={this.newGame}>New Game</Action>
            <Action onClick={this.togglePlay}>
              {this.state.isPlaying ? "Pause" : "Play"}
            </Action>
            {engine.isCheck(this.state.fen) && "Check"}
          </Controls>
        </BoardContainer>
        <History history={this.state.history} />
      </div>
    );
  }
}

export default styled(Game)`
  width: 700px;
  margin: auto;
`;
