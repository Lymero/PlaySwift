import React from "react";
import PlaylistsComponent from "./playlists_component";
import { connect } from "react-redux";
import { withPlaylists } from "react/context/playlists";
import DateUtils from "react/utils/date";

class AllPlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      title: "All playlists ",
      showOnlySubscribed: false,
      sortByNewests: false
    };
    this.toggleShowOnlySubscribed = this.toggleShowOnlySubscribed.bind(this);
    this.toggleSortByNewests = this.toggleSortByNewests.bind(this);
  }

  toggleShowOnlySubscribed() {
    let toggled = !this.state.showOnlySubscribed;
    this.setState({ showOnlySubscribed: toggled });
  }

  toggleSortByNewests() {
    let toggled = !this.state.sortByNewests;
    this.setState({ sortByNewests: toggled });
  }

  componentDidUpdate() {}

  componentDidMount() {}

  render() {
    let result =
      this.state.showOnlySubscribed === true
        ? this.props.playlists.filter(p => {
            return this.props.myTags.some(t => {
              return t.id_tag === p.id_tag;
            });
          })
        : this.props.playlists;

    this.state.sortByNewests === true
      ? result.sort(function(a, b) {
          let dateA = new Date(a.creation_date);
          let dateB = new Date(b.creation_date);
          return dateA.getTime() - dateB.getTime();
        })
      : result.sort(function(a, b) {
          return b.likes_number - a.likes_number;
        });

    return (
      <PlaylistsComponent
        showOnlySubscribed={this.state.showOnlySubscribed}
        sortByNewests={this.state.sortByNewests}
        handleOnlySubscribed={this.toggleShowOnlySubscribed}
        handleSortByNewests={this.toggleSortByNewests}
        className="allPlaylists"
        title={this.state.title}
        playlistsToShow={result}
        {...this.props}
      />
    );
  }
}

export default connect()(withPlaylists(AllPlaylistsContainer));
