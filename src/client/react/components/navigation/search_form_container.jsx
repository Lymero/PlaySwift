import React from "react";
import SearchForm from "./search_form";

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

  search(event) {
    event.preventDefault();
    console.log("Search with filter : " + this.state.filter);
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
