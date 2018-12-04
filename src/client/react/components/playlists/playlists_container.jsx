import React from "react";
import { connect } from "react-redux";
import PlaylistsComponent from "./playlists_component";
import { displayPlaylists } from "../../redux/actions";

class PlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(displayPlaylists());
  }

  render() {
    return (
      <PlaylistsComponent/>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

export default connect(mapStateToProps)(PlaylistsContainer);
