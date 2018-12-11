import React from "react";
import PlaylistsComponent from "./playlists_component";
import { connect } from "react-redux";
import {withPlaylists} from 'react/context/playlists';

class AllPlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "All playlist", playlists: props.playlists }
  }

  componentDidMount() {}

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

export default connect()(withPlaylists(AllPlaylistsContainer));
