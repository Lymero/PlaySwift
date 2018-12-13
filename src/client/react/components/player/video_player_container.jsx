import React from "react";
import videojs from "video.js";
import youtube from "videojs-youtube";

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
            src: "https://youtube.com/"
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
      function onPlayerReady() {}
    );
  }

  componentDidUpdate() {
    if (this.props.video === undefined) return;
    let src = this.wrapSource(this.props.video.url_video);
    this.player.src(src);
    this.player.poster(this.props.video.url_thumbnail);
    this.player.load();
    this.player.play();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    let video = this.props.video;
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
        
        <h2 className="mt-3">{video !== undefined ? this.props.video.title : "Chargement en cours"}</h2>
        <h5 className="mt-2">{video !== undefined ? this.props.video.description : "Chargement en cours"}</h5>
      </div>
    );
  }
}
