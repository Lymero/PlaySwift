import React from "react";
import PlaylistsComponent from "./playlists_component";
import { connect } from "react-redux";
import { withPlaylists } from "react/context/playlists";

class MyPlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "My Playlists"
    };
  }

  render() {
    return (
      <PlaylistsComponent
        title={this.state.title}
        playlistsToShow={this.props.myPlaylists}
        {...this.props}
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

export default connect(mapStateToProps)(withPlaylists(MyPlaylistsContainer));
