import React from "react";
import PlayerComponent from "../../components/player/player_component";

class PlayerContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Player:</h1>
        <PlayerComponent />
      </div>
    );
  }
}

export default PlayerContainer;
