import React from "react";
import PlaylistsComponent from "./playlists_component";
import { connect } from "react-redux";
import Api from "react/utils/api";

class MyPlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "My Playlists", playlists: [] };
    this.displayNumberPlaylists = this.displayNumberPlaylists.bind(this);
  }

  componentDidMount() {
    Api({
      url: "/playlists",
      method: "GET",
      param: null
    }).then(playlists => {
      this.setState(Object.assign({}, this.state, { playlists: playlists }));
    });
  }

  displayNumberPlaylists() {
    return this.state.playlists.length;
  }

  render() {
    return (
      <PlaylistsComponent
        title={this.state.title}
        playlists={this.state.playlists}
        {...this.props}
      />
    );
  }
}

export default connect()(MyPlaylistsContainer);
