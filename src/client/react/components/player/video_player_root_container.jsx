import React from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import VideoPlayer from "./video_player_container";
import NewVideo from "react/components/playlists/new_video/new_video_container";

class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: parseInt(location.href.split("/").pop()),
      videos: [
        "https://www.youtube.com/watch?v=NA1LM2ucrDc",
        "https://www.youtube.com/watch?v=XdCOymlUxBc",
        "https://www.youtube.com/watch?v=fQU0MBft1lY"
      ],
      selectedVideo: "https://www.youtube.com/watch?v=NA1LM2ucrDc"
    };
    this.changeVideo = this.changeVideo.bind(this);
  }

  componentDidMount() {}

  changeVideo(event) {
    console.log("Root");
    // console.log(event.target.tagName);
    if (event.target.tagName === "BUTTON") {
      let url = event.target.dataset.url;
      console.log(url);
      this.setState((state, props) => ({
        selectedVideo: url
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
            {this.state.videos.map((video, i) => (
              <Col xs={12} key={i}>
                <ListGroup.Item key={i}>
                  <Button data-url={video}>{video}</Button>
                </ListGroup.Item>
              </Col>
            ))}
          </Row>
        </ListGroup>
      </Container>
    );
  }
}

export default PlayerComponent;
