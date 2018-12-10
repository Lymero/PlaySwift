import React from "react";
import SearchForm from "./search_form";
import Api from "react/utils/api";
class SearchFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Currently search by playlists.name
   * Case-insensitive
   */
  search(event) {
    event.preventDefault();
    console.log("Search with filter : " + this.state.filter);
    Api({
      url: "/api/playlists",
      method: "GET"
    }).then(playlists => {
      console.log(playlists);
      const filteredPlaylists = playlists.filter(playlist =>
        playlist["name"].toUpperCase().includes(this.state.filter.toUpperCase())
      );
      console.log(filteredPlaylists);
    });
  }

  render() {
    return (
      <SearchForm
        filter={this.state.filter}
        handleChange={this.handleChange}
        search={this.search}
      />
    );
  }
}
export default SearchFormContainer;
