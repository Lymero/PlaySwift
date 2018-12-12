import React from "react";
import Api from "react/utils/api";
import { connect } from "react-redux";
import ReactionsComponent from "./reactions_component";
import { withPlaylists } from "../../context/playlists";

class ReactionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes_number: this.props.video.likes_number,
      dislikes_number: this.props.video.dislikes_number
    };
    this.video = this.props.video;
    this.addReaction = this.addReaction.bind(this);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
  }

  addReaction(vote) {
    Api({
      url: `/api/videos/${this.props.video.id_video_playlist}/reactions`,
      method: "POST",
      params: { id_playlist: this.props.video.id_playlist, vote }
    }).then(response => {
      const createdOrUpdatedReaction = response;
      if (vote === "like" && createdOrUpdatedReaction !== false) {
        this.setState({ likes_number: this.state.likes_number + 1 });
        if (!response[1]) {
          this.setState({ dislikes_number: this.state.dislikes_number - 1 });
        }
      } else if (vote === "dislike" && createdOrUpdatedReaction !== false) {
        this.setState({ dislikes_number: this.state.dislikes_number + 1 });
        if (!response[1]) {
          this.setState({ likes_number: this.state.likes_number - 1 });
        }
      }
      this.props.loadInitialPlaylists();
    });
  }

  like(event) {
    event.preventDefault();
    this.addReaction("like");
  }

  dislike(event) {
    event.preventDefault();
    this.addReaction("dislike");
  }

  render() {
    return (
      <ReactionsComponent
        likes_number={this.state.likes_number}
        dislikes_number={this.state.dislikes_number}
        like={this.like}
        dislike={this.dislike}
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

export default connect(mapStateToProps)(withPlaylists(ReactionsContainer));
