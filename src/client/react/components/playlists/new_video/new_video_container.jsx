import React from "react";
import { connect } from "react-redux";
import { withPlaylists } from "react/context/playlists";
import NewVideoComponent from "./new_video";

class NewVideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.addVideo = this.addVideo.bind(this);
    this.ctxRemoveVideoCurrentPlaylist = this.props.addVideoCurrentPlaylist;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addVideo(event) {
    event.preventDefault();
    this.setState({ url: "" });
    this.setState({ description: "" });
    const body = {
      url_video: this.state.url,
      description: this.state.description
    };
    this.ctxRemoveVideoCurrentPlaylist(body);
  }

  render() {
    return (
      <NewVideoComponent
        url={this.state.url}
        description={this.state.description}
        handleChange={this.handleChange}
        addVideo={this.addVideo}
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

export default connect(mapStateToProps)(withPlaylists(NewVideoContainer));
