import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import PlaylistPreview from "react/components/playlists/playlist_preview";
import NewPlaylistForm from "react/containers/playlists/new_playlist_form_container";

const PlaylistsComponent = ({ playlists }) => {
  return (
    <Container>
      <Row>
        <h3>Playlists</h3>
        <ListGroup>
          <Row>
            {playlists.map((playlist, i) => (
              <Col xs={12} sm={6} md={4} lg={3} key={i}>
                <ListGroup.Item key={i}>
                  <PlaylistPreview playlist={playlist} />
                </ListGroup.Item>
              </Col>
            ))}
            <Col xs={12} sm={6} md={4} lg={3}>
              <NewPlaylistForm />
            </Col>
          </Row>
        </ListGroup>
      </Row>
    </Container>
  );
};

export default PlaylistsComponent;
