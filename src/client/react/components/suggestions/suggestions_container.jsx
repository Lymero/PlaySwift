import React from "react";
import { connect } from "react-redux";
import SuggestionsComponent from "./suggestions_component";
import { withPlaylists } from "react/context/playlists";

class SuggestionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.ctxManageSuggestion = this.props.manageSuggestion;
  }

  accept(suggestion) {
    const body = Object.assign(suggestion, {
      state: "accepted"
    });
    this.ctxManageSuggestion(body);
  }

  refuse(suggestion) {
    const body = Object.assign(suggestion, {
      state: "refused"
    });
    this.ctxManageSuggestion(body);
  }

  render() {
    return (
      <SuggestionsComponent
        accept={() => this.accept(this.props.suggestion)}
        refuse={() => this.refuse(this.props.suggestion)}
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

export default connect(mapStateToProps)(withPlaylists(SuggestionsContainer));
