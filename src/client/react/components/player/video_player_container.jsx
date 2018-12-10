import React from "react";
import videojs from "video.js";
import youtube from "../../../../../node_modules/videojs-youtube/dist/Youtube";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pluginLoaded: false,
      options: {
        fluid: true,
        autoplay: false,
        controls: true,
        techOrder: ["youtube", "html5"],
        sources: [
          {
            type: "video/youtube",
            src: this.props.video
          }
        ]
      }
    };
  }

  wrapSource(url) {
    return {
      type: "video/youtube",
      src: url
    };
  }

  componentDidMount() {
    if (!this.state.pluginLoaded) {
      videojs.registerPlugin("youtube", () => youtube);
      this.setState({ pluginLoaded: true });
    }
    this.player = videojs(
      this.videoNode,
      this.state.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  }

  componentDidUpdate() {
    console.log("Component : ");
    console.log(this.props.video);
    let src = this.wrapSource(this.props.video);
    this.player.src(src);
    this.player.load();
    this.player.play();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            id="video-1"
            ref={node => (this.videoNode = node)}
            data-setup={JSON.stringify(this.state.options)}
            className="video-js vjs-default-skin vjs-big-play-centered"
          />
        </div>
      </div>
    );
  }
}
