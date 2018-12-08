import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import VideoPreview from "react/components/videos/video_preview";
import NewVideoForm from "react/containers/videos/new_video_form_container";

const VideosComponent = ({ videos }) => {
  return (
    <Container>
      <Row>
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
      </Row>
    </Container>
  );
};

export default VideosComponent;
