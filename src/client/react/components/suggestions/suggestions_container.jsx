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
    this.ctxManageSuggestion("accepted");
  }

  refuse(event) {
    event.preventDefault();
    this.ctxManageSuggestion("refused");
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
