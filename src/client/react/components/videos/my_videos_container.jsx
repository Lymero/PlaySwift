import React from "react";
import VideosComponent from "./videos_component";
import Api from "react/utils/api";

class MyVideosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
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

  render() {
    console.log(this.state.videos);
    return <VideosComponent videos={this.state.videos} {...this.props} />;
  }
}

export default MyVideosContainer;
