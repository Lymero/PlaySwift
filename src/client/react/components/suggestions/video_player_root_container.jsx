import React from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import VideoPlayerContainer from "react/components/suggestions/video_player_container";
import SuggestionsContainer from "./suggestions_container";
import { withPlaylists } from "react/context/playlists";
import { connect } from "react-redux";
class VideoPlayerRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistSuggestions: [],
      selectedVideo: undefined,
      selectedVideoDom: undefined
    };
    this.playlistId = parseInt(
      location.href
        .substr(0, location.href.indexOf("/suggestions"))
        .split("/")
        .pop()
    );
    this.ctxSetCurrentPlaylist = this.props.setCurrentPlaylist;
    this.changeVideo = this.changeVideo.bind(this);
    this.updated = false;
  }

  componentDidMount() {
    this.ctxSetCurrentPlaylist(this.playlistId);
  }

  componentDidUpdate() {
    if (!this.state.updated) {
      if (this.props.mySuggestions[0] !== undefined) {
        const suggestions = this.props.mySuggestions.filter(
          suggestion =>
            (suggestion.id_playlist === this.playlistId) &
            (suggestion.state === "pending")
        );
        this.setState((state, props) => ({
          selectedVideo: this.state.playlistSuggestions[0],
          playlistSuggestions: suggestions,
          updated: true
        }));
      }
    }
  }

  changeVideo(event) {
    if (event.target.innerHTML === "Play") {
      let id = event.target.dataset.videoid;
      // let dom = event.target.closest(".list-group-item");
      // if (this.state.selectedVideoDom !== undefined)
      // this.state.selectedVideoDom.classList.remove("active");
      this.setState(
        (state, props) => ({
          // selectedVideoDom: dom,
          selectedVideo: this.state.playlistSuggestions[id]
        }) //,
        // () => {
        //   this.state.selectedVideoDom.classList.add("active");
        // }
      );
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xl={7} l={7} md={7} sm={12} xs={12}>
            {this.state.playlistSuggestions !== undefined &&
              this.state.playlistSuggestions.length > 0 && (
                <VideoPlayerContainer video={this.state.selectedVideo} />
              )}
            {this.state.playlistSuggestions !== undefined &&
              this.state.playlistSuggestions.length === 0 && (
                <h1>No suggestion yet :'(</h1>
              )}
          </Col>
          <Col xl={5} l={5} md={5} sm={12} xs={12}>
            <ListGroup onClick={this.changeVideo}>
              {this.state.playlistSuggestions !== undefined &&
                this.state.playlistSuggestions.map((video, i) => (
                  <ListGroup.Item key={i} data-videoid={i}>
                    <Row>
                      <Col className="thumbnail-container" xl={4} sm={12}>
                        <img className="thumbnail" src={video.url_thumbnail} />
                      </Col>
                      <Col xl={8} sm={12}>
                        <h5>{video.title}</h5>
                        <span>{video.description}</span>
                        <br />
                        <Button data-videoid={i}>Play</Button>
                      </Col>
                      <Col>
                        <SuggestionsContainer suggestion={video} />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
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
