import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import VideoPlayer from "./video_player_container";

class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_playlist: parseInt(location.href.split("/").pop()),
      videos: [
        "https://www.youtube.com/watch?v=NA1LM2ucrDc"
      ],
      sources: []
    };
  }

  // "https://www.youtube.com/watch?v=NA1LM2ucrDc",
  // "https://www.youtube.com/watch?v=XdCOymlUxBc",
  // "https://www.youtube.com/watch?v=fQU0MBft1lY"

  populateSources() {
    let videoUrls = [];
    this.state.videos.forEach(video => {
      videoUrls.push({
        type: "video/youtube",
        src: video
      });
    });
    this.setState({
      sources: videoUrls
    });
  }

  componentDidMount() {
    this.populateSources();
  }

  render() {
    console.log("Root : ");
    console.log(this.state);
    return (
      <Container>
        <h1>Player</h1>
        <VideoPlayer sources={this.state.sources} />
        <ListGroup>
          <Row>
            {this.state.sources.map((source, i) => (
              <Col xs={12} key={i}>
                <ListGroup.Item key={i}>
                  <p>{source.src}</p>
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
