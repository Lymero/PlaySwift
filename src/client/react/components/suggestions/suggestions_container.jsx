import React from "react";
import { connect } from "react-redux";
import SuggestionsComponent from "./suggestions_component";
import { withPlaylists } from "react/context/playlists";

class SuggestionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.ctxManageSuggestion = this.props.manageSuggestion;
  }

  accept(event) {
    event.preventDefault();
    const body = {
      id_suggestion: this.props.currentPlaylistSuggestions.id_suggestion,
      id_playlist: this.props.currentPlaylistSuggestions.id_playlist,
      state: "accepted"
    };
    this.ctxManageSuggestion(body);
  }

  refuse(event) {
    event.preventDefault();
    const body = {
      id_suggestion: this.props.currentPlaylistSuggestions.id_suggestion,
      id_playlist: this.props.currentPlaylistSuggestions.id_playlist,
      state: "refused"
    };
    this.ctxManageSuggestion(body);
  }

  render() {
    return <SuggestionsComponent accept={this.accept} refuse={this.refuse} />;
  }
}

const mapStateToProps = state => {
  return {
    profile: state.usersSession.profile,
    userId: state.usersSession.userId
  };
};

export default connect(mapStateToProps)(withPlaylists(SuggestionsContainer));
