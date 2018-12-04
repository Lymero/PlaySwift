import React from "react";
import { connect } from "react-redux";

class PlaylistsContainer extends React.Component {
  fetchPlaylists() {
    /* fetch("/playlists", {
      method: "GET"
    })
      .then(resp => {
        return resp.json();
      })
      .then(playslists => {
        this.setState({
          playlists: playslists
        });
      }); */
  }

  componentDidMount() {
    console.log("mount");
    this.props.dispatch({ type: "DISPLAY_PLAYLISTS" });
  }

  render() {
    console.log(this.props.playlists);
    return <p>{this.props.playlists["playlist"]}</p>;
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

export default connect(mapStateToProps)(PlaylistsContainer);
