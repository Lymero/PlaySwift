import React from "react";
import PlaylistsComponent from "../../components/playlists/playlists_component";
import { connect } from "react-redux";

class MyPlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playlists: [] };
    this.displayNumberPlaylists = this.displayNumberPlaylists.bind(this);
  }

  componentDidMount() {
    fetch("/playlists", { method: "GET" })
      .then(resp => {
        return resp.json();
      })
      .then(playlists => {
        this.setState(Object.assign({}, this.state, { playlists: playlists }));
      });
  }

  displayNumberPlaylists() {
    return this.state.playlists.length;
  }

  render() {
    return (
      <div>
        <h1>
          My playlists
          <span className="badge badge-secondary">
            {this.displayNumberPlaylists()}
          </span>
        </h1>
        <PlaylistsComponent playlists={this.state.playlists} {...this.props} />
      </div>
    );
  }
}

export default connect()(MyPlaylistsContainer);
