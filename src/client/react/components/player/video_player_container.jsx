import React from "react";
import videojs from "video.js";
import youtube from "../../../../../node_modules/videojs-youtube/dist/Youtube";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pluginLoaded: false,
      options: {
        autoplay: false,
        controls: true,
        techOrder: ["youtube"],
        sources: []
      }
    };
  }

  componentDidMount() {
    if (!this.state.pluginLoaded) {
      videojs.registerPlugin("youtube", () => {
        youtube;
      });
      this.setState({ pluginLoaded: true });
    }
    this.player = videojs(this.videoNode, this.state.options, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });
  }

  UNSAFE_componentWillUpdate() {
    console.log("Component : ");
    console.log(this.props.sources);
    this.player.src(this.props.sources);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <div data-vjs-player>
          <video
            id="video-1"
            ref={node => (this.videoNode = node)}
            data-setup={JSON.stringify(this.state.options)}
            className="video-js vjs-big-play-centered"
          />
        </div>
      </div>
    );
  }
}
