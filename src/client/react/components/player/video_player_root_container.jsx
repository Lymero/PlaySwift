import React from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import VideoPlayerContainer from "./video_player_container";
import NewVideoContainer from "react/components/playlists/new_video/new_video_container";
import SuggestVideoContainer from "react/components/player/suggest_video/suggest_video_container";
import { withPlaylists } from "react/context/playlists";

class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: parseInt(location.href.split("/").pop()),
      selectedVideo: this.props.currentPlaylistVideos[0],
      updated: false
    };
    this.changeVideo = this.changeVideo.bind(this);
    this.ctxSetCurrentPlaylist = this.props.setCurrentPlaylist;
  }

  componentDidMount() {
    this.ctxSetCurrentPlaylist(this.state.playlistId);
  }

  componentDidUpdate() {
    if (!this.state.updated) {
      if (this.props.currentPlaylistVideos[0] !== undefined) {
        this.setState((state, props) => ({
          selectedVideo: this.props.currentPlaylistVideos[0]
        }));
        this.setState((state, props) => ({
          updated: true
        }));
      }
    }
  }

  changeVideo(event) {
    if (event.target.tagName === "BUTTON") {
      let id = event.target.dataset.videoid;
      this.setState((state, props) => ({
        selectedVideo: this.props.currentPlaylistVideos[id]
      }));
    }
  }

  //TODO
  isMyPlaylist() {
    return false;
  }

  render() {
    console.log(this.isMyPlaylist());
    return (
      <Container>
        <VideoPlayerContainer video={this.state.selectedVideo} />
        <ListGroup onClick={this.changeVideo}>
          <Row>
            {this.props.currentPlaylistVideos !== undefined &&
              this.props.currentPlaylistVideos.map((video, i) => (
                <Col xs={12} key={i}>
                  <ListGroup.Item key={i}>
                    <Button data-videoid={i}>Play</Button>
                    <span>{video.description}</span>
                  </ListGroup.Item>
                </Col>
              ))}
          </Row>
        </ListGroup>
        {this.isMyPlaylist() == false && (
          <SuggestVideoContainer id_playlist={this.state.playlistId} />
        )}
        {this.isMyPlaylist() == true && (
          <NewVideoContainer id={this.state.playlistId} />
        )}
      </Container>
    );
  }
}

export default withPlaylists(PlayerComponent);
