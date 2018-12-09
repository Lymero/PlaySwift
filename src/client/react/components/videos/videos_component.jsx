import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import VideoPreview from "./video_preview";
import NewVideoForm from "./new_video_form_container";

const VideosComponent = ({ videos }) => {
  return (
    <Container>
      <h3>
        <span className="badge badge-secondary">{videos.length}</span>
      </h3>
      <ListGroup>
        <Row>
          {videos.map((video, i) => (
            <Col xs={12} sm={12} md={6} lg={6} key={i}>
              <ListGroup.Item key={i}>
                <VideoPreview video={video} />
              </ListGroup.Item>
            </Col>
          ))}
          <Col xs={12} sm={12} md={6} lg={6}>
            <NewVideoForm />
          </Col>
        </Row>
      </ListGroup>
    </Container>
  );
};

export default VideosComponent;
