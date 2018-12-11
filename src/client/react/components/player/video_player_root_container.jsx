import React from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import VideoPlayer from "./video_player_container";
import NewVideo from "react/components/playlists/new_video/new_video_container";
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

  render() {
    return (
      <Container>
        <VideoPlayer video={this.state.selectedVideo} />
        <NewVideo id={this.state.playlistId} />
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
        {/* if i'm not the owner of the playlist */}
        <SuggestVideoContainer />
      </Container>
    );
  }
}

export default withPlaylists(PlayerComponent);
