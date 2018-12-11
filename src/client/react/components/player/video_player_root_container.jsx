import React from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import VideoPlayerContainer from "./video_player_container";
import NewVideoContainer from "react/components/playlists/new_video/new_video_container";
import ReactionsContainer from "react/components/reactions/reactions_container";
import SuggestVideoContainer from "react/components/player/suggest_video/suggest_video_container";
import { withPlaylists } from "react/context/playlists";
import { connect } from "react-redux";

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
    // SET ListGroupItem as ACTIVE
    if (event.target.tagName === "BUTTON") {
      let id = event.target.dataset.videoid;
      this.setState((state, props) => ({
        selectedVideo: this.props.currentPlaylistVideos[id]
      }));
    }
  }

  /**
   * return true if this playlist belongs to the current user
   */
  isMyPlaylist() {
    return (
      this.props.playlists.filter(
        p =>
          p.id_playlist === this.state.playlistId &&
          p.id_user === this.props.userId
      ).length === 1
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xl={7} l={7} md={7} sm={12} xs={12}>
            <VideoPlayerContainer video={this.state.selectedVideo} />
          </Col>
          <Col xl={5} l={5} md={5} sm={12} xs={12}>
            <ListGroup onClick={this.changeVideo}>
                {this.props.currentPlaylistVideos !== undefined &&
                  this.props.currentPlaylistVideos.map((video, i) => (
                  <ListGroup.Item key={i} data-videoid={i}>
                    <Row>
                      <Col className="thumbnail-container" xl={4} sm={12}>
                      <img className="thumbnail" src={video.url_thumbnail}/>
                      <ReactionsContainer video={video} />
                      </Col>
                      <Col xl={8}  sm={12}>
                      <h5>{video.title}</h5>
                      <span>{video.description}</span><br/>
                      <Button data-videoid={i}>Play</Button>
                      
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  ))}
            </ListGroup>
            {this.isMyPlaylist() == false && (
              <SuggestVideoContainer id_playlist={this.state.playlistId} />
            )}
            {this.isMyPlaylist() == true && (
              <NewVideoContainer id={this.state.playlistId} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.usersSession.profile,
    userId: state.usersSession.userId
  };
};

export default connect(mapStateToProps)(withPlaylists(PlayerComponent));
