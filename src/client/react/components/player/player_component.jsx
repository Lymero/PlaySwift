import React from "react";

class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  dataSetup() {
    return `{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "${
      this.props.video["url_video"]
    }"}] }`;
  }

  render() {
    return (
      <div>
        <video
          id={this.props.video["id_video"]}
          className="video-js vjs-big-play-centered"
          controls
          data-setup={this.dataSetup()}
        />
      </div>
    );
  }
}

export default PlayerComponent;
