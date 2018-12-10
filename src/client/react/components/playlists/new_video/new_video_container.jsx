import React from "react";
import NewVideoComponent from "./new_video";
import Api from "react/utils/api";
import { connect } from "react-redux";

class NewVideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.addVideo = this.addVideo.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addVideo(event) {
    event.preventDefault();
    let body = {
      url_video: this.state.url,
      description: this.state.description
    };
    Api({
      url: "/api/playlists/" + this.props.id + "/videos",
      method: "POST",
      params: body
    });
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

export default connect(mapStateToProps)(NewVideoContainer);
