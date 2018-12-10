import React from "react";
import NewVideoComponent from "react/components/videos/new_video_component";
import Api from "react/utils/api";

class NewVideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url_video: "https://www.youtube.com/watch?v=zGW7TRtcDeQ",
      description: "issou"
    };

    this.handleChange = this.handleChange.bind(this);
    this.addVideo = this.addVideo.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.url]: event.target.value });
  }

  addVideo(event) {
    event.preventDefault();
    console.log("<<<addVideo>>>");
    let id_playlist = this.props.id_playlist;
    let body = {
      url_video: this.state.url_video,
      description: this.state.description,
      id_playlist: this.props.id_playlist
    };
    Api({
      url: `/api/playlists/${id_playlist}/videos`,
      method: "POST",
      params: body
    });
  }

  render() {
    return (
      <NewVideoComponent
        url={this.state.url_video}
        description={this.state.description}
        handleChange={this.handleChange}
        addVideo={this.addVideo}
      />
    );
  }
}

export default NewVideoContainer;
