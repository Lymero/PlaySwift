import React from "react";
import { withPlaylists } from "react/context/playlists";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";

class RemoveVideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.deleteVideo = this.deleteVideo.bind(this);
    this.ctxRemoveVideoCurrentPlaylist = this.props.removeVideoCurrentPlaylist;
  }

  deleteVideo(event) {
    event.preventDefault();
    this.ctxRemoveVideoCurrentPlaylist(this.props.video.id_video_playlist);
  }

  render() {
    return (
      <Button
        className="btn btn-secondary"
        data-dismiss="modal"
        onClick={this.deleteVideo}
      >
        Delete
      </Button>
    );
  }
}

export default withPlaylists(RemoveVideoContainer);
