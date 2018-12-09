import React from "react";
import PlayerContainer from "../../containers/player/player_container";

class VideoPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { video } = this.props;
    return (
      <div>
        <h5>{video["title"]}</h5>
        <PlayerContainer video={video} />
        <p>description: {video["description"]}</p>
        <p>position: {video["position"]}</p>
        <p>url: {video["url_video"]}</p>
      </div>
    );
  }
}

export default VideoPreview;
