import React from "react";
import PlaylistsComponent from "../../components/playlists/playlists_component";
import { connect } from "react-redux";

class AllPlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playlists: [] };
  }
  //TODO
  componentDidMount() {
    fetch("/playlists/1", { method: "GET" })
      .then(resp => {
        return resp.json();
      })
      .then(videos => {
        this.setState(Object.assign({}, this.state, { videos: videos }));
      });
  }

  render() {
    return (
      <PlaylistsComponent playlists={this.state.playlists} {...this.props} />
    );
  }
}

export default connect()(AllPlaylistsContainer);
