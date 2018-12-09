import React from "react";
import NewPlaylistComponent from "./new_playlist_component";
import Api from "react/utils/api";
import { connect } from "react-redux";

class NewPlaylistContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      tag: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addPlaylist(event) {
    event.preventDefault();
    let userID = this.props.usersSession.userId;
    let body = {
      name: this.state.name,
      id_tag: this.state.tag,
      visible: 1,
      id_user: userID,
      description: this.state.description
    };

    console.log(body);

    Api({
      url: "/playlists",
      method: "POST",
      params: body
    });
  }

  render() {
    return (
      <NewPlaylistComponent
        name={this.state.name}
        description={this.state.description}
        tag={this.state.tag}
        handleChange={this.handleChange}
        addPlaylist={this.addPlaylist}
      />
    );
  }
}

const mapStateToProps = state => {
  return {profile: state.usersSession.profile}
}; 

export default connect(mapStateToProps)(NewPlaylistContainer);
