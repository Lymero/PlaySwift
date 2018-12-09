import React from "react";
import PlayerComponent from "./player_component";

class PlayerContainer extends React.Component {
  render() {
    return (
      <div>
        <PlayerComponent video={this.props.video} />
      </div>
    );
  }
}

export default PlayerContainer;
