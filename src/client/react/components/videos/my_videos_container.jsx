import React from "react";
import VideosComponent from "./videos_component";
import Api from "react/utils/api";

class MyVideosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      id_playlist: parseInt(location.href.split("/").pop())
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  componentDidUpdate() {
    // this.fetchVideos();
  }

  fetchVideos() {
    Api({
      url: `/api/playlists/${this.state.id_playlist}/videos`,
      method: "GET",
      params: null
    }).then(videos => {
      this.setState(Object.assign({}, this.state, { videos: videos }));
    });
  }

  render() {
    console.log(this.state);
    return (
      <VideosComponent
        id_playlist={this.state.id_playlist}
        videos={this.state.videos}
        {...this.props}
      />
    );
  }
}

export default MyVideosContainer;
