import React, { Component } from "react";
import styled from "styled-components";

import Game from "./Game";
import SelectBot from "./SelectBot";

const Players = styled.div`
  margin: auto;
  width: 500px;
`;

class App extends Component {
  state = {
    white: undefined,
    black: undefined
  };

  handleBotChange = (player, bot) => {
    this.setState({ [player]: bot });
  };

  render() {
    return (
      <div className={this.props.className}>
        <Players>
          <SelectBot
            bots={this.props.bots}
            player="white"
            onBotChange={this.handleBotChange}
          />
          <SelectBot
            bots={this.props.bots}
            player="black"
            onBotChange={this.handleBotChange}
          />
        </Players>
        <Game white={this.state.white} black={this.state.black} />
      </div>
    );
  }
}

export default styled(App)`
  margin: auto;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
