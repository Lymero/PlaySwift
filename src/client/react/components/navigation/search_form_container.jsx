import React from "react";
import SearchForm from "./search_form";
import { withPlaylists } from "react/context/playlists";
import { connect } from "react-redux";
class SearchFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.ctxFilter = this.props.displayFilteredPlaylists;
    this.ctxIntitialPlaylists = this.props.loadInitialPlaylists;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Search by playlists.name, case-insensitive
   */
  search(event) {
    event.preventDefault();
    console.log("KEYWORD:");
    console.log(this.state.filter);
    const filteredPlaylists = this.props.playlists.filter(playlist =>
      playlist["name"].toUpperCase().includes(this.state.filter.toUpperCase())
    );
    this.ctxFilter(filteredPlaylists);
  }

  onSubmit(event) {
    this.search(event);
  }

  render() {
    return (
      <SearchForm
        filter={this.state.filter}
        handleChange={this.handleChange}
        search={this.search}
        onSubmit={this.onSubmit}
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

export default connect(mapStateToProps)(withPlaylists(SearchFormContainer));
