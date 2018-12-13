import React from "react";
import NewPlaylistComponent from "./new_playlist";
import { connect } from "react-redux";
import { withPlaylists } from "react/context/playlists";

class NewPlaylistContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      visible: true,
      tag: 1,
      tags: [],
      tagFilter: "",
      filteredTags: [],
      updated: false
    };

    this.ctxAddPlaylist = this.props.addPlaylist;
    this.addPlaylist = this.addPlaylist.bind(this);
    this.filterTags = this.filterTags.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.updated) {
      if (this.props.tags !== undefined && this.props.tags.length > 0) {
        this.setState((state, props) => ({
          tags: this.props.tags,
          updated: true
        }));
      }
    }
  }

  handleChange(event) {
    if (event.target.name === "visible")
      this.setState({ visible: !this.state.visible });
    else if (event.target.name === "tagFilter")
      this.setState(
        { [event.target.name]: event.target.value },
        this.filterTags()
      );
    else this.setState({ [event.target.name]: event.target.value });
  }

  filterTags() {
    const filter = this.state.tagFilter.toUpperCase();
    const result = this.state.tags.filter(t =>
      t.tag_name.toUpperCase().includes(filter)
    );
    this.setState({
      filteredTags: result
    });
  }

  addPlaylist() {
    this.setState({ name: "" });
    this.setState({ description: "" });
    this.setState({ tags: [] });
    this.setState({ tagFilter: "" });
    this.setState({ filteredTags: [] });

    const body = {
      name: this.state.name,
      id_tag: this.state.tag,
      visible: this.state.visible,
      id_user: this.props.userId,
      description: this.state.description
    };
    this.ctxAddPlaylist(body);
  }

  render() {
    return (
      <NewPlaylistComponent
        // raw values
        name={this.state.name}
        description={this.state.description}
        tag={this.state.tag}
        // tags
        tagFilter={this.state.tagFilter}
        filteredTags={this.state.filteredTags}
        // actions
        addPlaylist={this.addPlaylist}
        handleChange={this.handleChange}
        filterTags={this.filterTags}
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

export default connect(mapStateToProps)(withPlaylists(NewPlaylistContainer));
