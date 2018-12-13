import React from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import VideoPlayerContainer from "./video_player_container";
import NewVideoContainer from "react/components/playlists/new_video/new_video_container";
import ReactionsContainer from "react/components/reactions/reactions_container";
import SuggestVideoContainer from "react/components/player/suggest_video/suggest_video_container";
import RemoveVideoContainer from "react/components/player/remove_video/remove_video_container";
import { withPlaylists } from "react/context/playlists";
import { connect } from "react-redux";

class VideoPlayerRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: 0
    };
    this.selectedVideoDom = undefined;
    this.playlistId = parseInt(location.href.split("/").pop());
    this.changeVideo = this.changeVideo.bind(this);
    this.ctxSetCurrentPlaylist = this.props.setCurrentPlaylist;
  }

  componentDidMount() {
    this.ctxSetCurrentPlaylist(this.playlistId);
  }

  componentDidUpdate() {}

  changeVideo(event) {
    if (event.target.innerHTML === "Play") {
      let id = event.target.dataset.videoid;
      let dom = event.target.closest(".list-group-item");
      if (this.selectedVideoDom !== undefined) {
        this.selectedVideoDom.classList.remove("active");
      }
      this.selectedVideoDom = dom;
      this.selectedVideoDom.classList.add("active");
      this.setState({ videoId: id });
    }
  }

  isMyPlaylist() {
    return (
      this.props.myPlaylists.filter(p => p.id_playlist === this.playlistId)
        .length > 0
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xl={7} l={7} md={7} sm={12} xs={12}>
            {this.props.currentPlaylistVideos !== undefined &&
              this.props.currentPlaylistVideos.length > 0 && (
                <VideoPlayerContainer
                  videoId={this.state.videoId}
                  videos={this.props.currentPlaylistVideos}
                />
              )}
          </Col>
          <Col xl={5} l={5} md={5} sm={12} xs={12}>
            <ListGroup onClick={this.changeVideo}>
              {this.props.currentPlaylistVideos !== undefined &&
                this.props.currentPlaylistVideos.map((video, i) => (
                  <ListGroup.Item key={i} data-videoid={i}>
                    <Row>
                      <Col className="thumbnail-container" xl={4} sm={12}>
                        <img className="thumbnail" src={video.url_thumbnail} />
                        <ReactionsContainer video={video} />
                      </Col>
                      <Col xl={8} sm={12}>
                        <h5>{video.title}</h5>
                        <span>{video.description}</span>
                        <br />
                        <Button data-videoid={i}>Play</Button>
                        {this.isMyPlaylist() == true && (
                          <RemoveVideoContainer video={video} />
                        )}
                        {/* TODO : show number of suggestions
                        for that playlist and button to redirect */}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
            {this.isMyPlaylist() === false && (
              <SuggestVideoContainer id_playlist={this.playlistId} />
            )}
            {this.isMyPlaylist() === true && (
              <NewVideoContainer id={this.playlistId} />
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

export default connect(mapStateToProps)(withPlaylists(VideoPlayerRoot));
