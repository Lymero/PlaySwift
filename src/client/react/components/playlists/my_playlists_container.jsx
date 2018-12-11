import React from "react";
import PlaylistsComponent from "./playlists_component";
import { connect } from "react-redux";
import {withPlaylists} from 'react/context/playlists';

class MyPlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "My Playlists",
      playlists: this.props.playlists,
      myPlaylists: this.filterMyPlaylists
    };
    this.displayNumberPlaylists = this.displayNumberPlaylists.bind(this);
  }

  filterMyPlaylists() {
    // HERE WE SHOULD ONLY SELECT OWNERS PLAYLISTS
    return this.state.playlists;
  }

  componentDidMount() {}

  displayNumberPlaylists() {
    return this.state.playlists.length;
  }

  render() {
    return (
      <PlaylistsComponent
        title={this.state.title}
        playlists={this.state.myPlaylists}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {profile: state.usersSession.profile}
};


export default connect(mapStateToProps)(withPlaylists(MyPlaylistsContainer));
