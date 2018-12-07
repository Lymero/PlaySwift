import React from "react";
import NewPlaylistComponent from "react/components/playlists/new_playlist_component";
import UsersUtils from "react/utils/users.js";

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
    let userID = UsersUtils.getUserProfile().sub;

    fetch('/playlists', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        id_tag: this.state.tag,
        visible: 1,
        id_user: userID,
        description: this.state.description
      })
    }).then(function(response) {
      console.log(response.text());
    });

    // THIS PART SHOULD BE IN A REDUX ACTION

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

export default NewPlaylistContainer;
