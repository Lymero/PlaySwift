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
/*
import React from "react";
import videojs from "video.js";
//import youtube from "videojs-youtube";

export default class PlayerComponent extends React.Component {
  componentDidMount() {
    // register yt plugin
    //videojs.registerPlugin("youtube", youtube);
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  dataSetup() {
    return `{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "${
      this.props.video["url_video"]
    }"}] }`;
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={node => (this.videoNode = node)} className="video-js" />
        </div>
      </div>
    );
  }
}
*/
