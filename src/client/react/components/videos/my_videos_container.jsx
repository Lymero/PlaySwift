import React from "react";
import VideosComponent from "./videos_component";
import Api from "react/utils/api";

class MyVideosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
    this.displayNumberVideos = this.displayNumberVideos.bind(this);
  }

  componentDidMount() {
    this.fetchVideos();
  }

  componentDidUpdate() {
    // this.fetchVideos();
  }

  fetchVideos() {
    Api({
      url: `/playlists/${parseInt(location.href.split("/").pop())}/videos`,
      method: "GET",
      param: null
    }).then(videos => {
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
