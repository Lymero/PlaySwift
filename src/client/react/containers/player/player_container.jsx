import React from "react";
import PlayerComponent from "../../components/player/player_component";

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
/*
import React from "react";
import PlayerComponent from "../../components/player/player_component";

class PlayerContainer extends React.Component {
  render() {
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          type: "video/mp4"
        }
      ]
    };

    return (
      <div>
        <PlayerComponent {...videoJsOptions} video={this.props.video} />
      </div>
    );
  }
}

export default PlayerContainer;
*/
