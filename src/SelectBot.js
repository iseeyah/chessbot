import React, { Component } from "react";
import styled from "styled-components";

export const toBot = (bots, name) => {
  const { action } = bots.filter(option => option.name === name)[0];
  return action && action();
};

var toTitleCase = str =>
  str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());

const Player = styled(({ name, ...props }) => (
  <span {...props}>{toTitleCase(name)}</span>
))`
  margin-right: 10px;
`;

class SelectBot extends Component {
  state = {
    selected: undefined
  };

  onBotChange = e => {
    const name = e.target.value;
    this.setState({ selected: name }, () => {
      this.props.onBotChange(this.props.player, toBot(this.props.bots, name));
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        <Player name={this.props.player} />
        <select value={this.state.selected} onChange={this.onBotChange}>
          {this.props.bots.map(({ name }) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default styled(SelectBot)`
  padding: 20px 0;
  float: left;
  margin-right: 20px;
`;
