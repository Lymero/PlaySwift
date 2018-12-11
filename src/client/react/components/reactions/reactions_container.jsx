import React from "react";
import Api from "react/utils/api";
import { connect } from "react-redux";
import ReactionsComponent from "./reactions_component";

class ReactionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes_number: this.props.video.likes_number,
      dislikes_number: this.props.video.dislikes_number
    };
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
  }

  addReaction(vote) {
    let body = { id_playlist: this.state.idPlaylist, vote, comment: "aucun" };
    Api({
      url: `/api/videos/3/reactions`,
      method: "POST",
      params: body
    }).then(() => {
      if (vote === "like") {
        this.setState({ likes_number: this.state.likes_number + 1 });
      } else {
        this.setState({ dislikes_number: this.state.dislikes_number + 1 });
      }
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

export default connect(mapStateToProps)(ReactionsContainer);
