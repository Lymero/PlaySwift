import React from "react";
import SuggestVideoComponent from "./suggest_video_component";
import Api from "react/utils/api";
import { connect } from "react-redux";
class SuggestVideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.suggestVideo = this.suggestVideo.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  suggestVideo(event) {
    event.preventDefault();
    let id_playlist = this.props.id_playlist;
    let body = {
      url_video: this.state.url,
      id_user: this.props.userId
    };
    console.log("ID_PLAYLIST");
    console.log(id_playlist);
    console.log("BODY");
    console.log(body);
    Api({
      url: `/api/playlists/${id_playlist}/suggestions`,
      method: "POST",
      params: body
    });
  }

  render() {
    return (
      <SuggestVideoComponent
        url={this.state.url}
        handleChange={this.handleChange}
        suggestVideo={this.suggestVideo}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.usersSession.profile,
    userId: state.usersSession.userId
  };
};

export default connect(mapStateToProps)(SuggestVideoContainer);
