import React from "react";
import NewPlaylistComponent from "react/components/playlists/new_playlist_component";

class NewPlaylistContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      tag: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addPlaylist(event) {
    event.preventDefault();
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
