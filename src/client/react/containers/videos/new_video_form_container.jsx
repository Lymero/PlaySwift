import React from "react";
import NewVideoComponent from "react/components/videos/new_video_component";
import UsersUtils from "react/utils/users.js";

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
    this.setState({ [event.target.url]: event.target.value });
  }

  addVideo(event) {
    // TODO
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

export default NewVideoContainer;
