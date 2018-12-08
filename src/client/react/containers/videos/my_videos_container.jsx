import React from "react";
import VideosComponent from "../../components/videos/videos_component";

class MyVideosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
    this.displayNumberVideos = this.displayNumberVideos.bind(this);
  }

  //TODO
  componentDidMount() {
    fetch("/playlists/1", { method: "GET" })
      .then(resp => {
        return resp.json();
      })
      .then(videos => {
        this.setState(Object.assign({}, this.state, { videos: videos }));
      });
  }

  displayNumberVideos() {
    return this.state.videos.length;
  }

  render() {
    console.log(this.state.videos);
    return (
      <div>
        <h1>
          My videos
          <span className="badge badge-secondary">
            {this.displayNumberVideos()}
          </span>
        </h1>
        <VideosComponent videos={this.state.videos} {...this.props} />
      </div>
    );
  }
}

export default MyVideosContainer;
