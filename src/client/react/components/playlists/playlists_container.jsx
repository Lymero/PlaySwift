import React from "react";

class PlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playlists: [] };
  }

  fetchPlaylists() {
    fetch("/playlists", {
      method: "GET"
    })
      .then(resp => {
        return resp.json();
      })
      .then(playslists => {
        this.setState({
          playlists: playslists
        });
      });
  }

  componentDidMount() {
    this.fetchPlaylists();
  }

  render() {
    return <p>{this.state.playlists["playlist"]}</p>;
  }
}

export default PlaylistsContainer;
