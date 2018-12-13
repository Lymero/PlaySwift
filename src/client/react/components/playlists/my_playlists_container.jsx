import React from "react";
import PlaylistsComponent from "./playlists_component";
import { connect } from "react-redux";
import { withPlaylists } from "react/context/playlists";

class MyPlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "My Playlists",
      sortByNewests: false,
    };
    this.toggleSortByNewests = this.toggleSortByNewests.bind(this);
  }

  toggleSortByNewests() {
    let toggled = !this.state.sortByNewests;
    this.setState({ sortByNewests: toggled });
  }

  render() {

    let result = this.props.myPlaylists;

    this.state.sortByNewests === true
      ? result.sort(function(a,b){
        let dateA = new Date(a.creation_date);
        let dateB = new Date(b.creation_date);
        return dateA.getTime() - dateB.getTime();
      })
      : result.sort(function(a,b){
        return b.likes_number - a.likes_number;
      });
    
    return (
      <PlaylistsComponent
        sortByNewests={this.state.sortByNewests}
        handleSortByNewests={this.toggleSortByNewests}
        title={this.state.title}
        className="myPlaylists"
        playlistsToShow={result}
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
