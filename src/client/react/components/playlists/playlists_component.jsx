import React from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import PlaylistPreview from "./playlist_preview";
import NewPlaylistForm from "./new_playlist/new_playlist_form_container";

const PlaylistsComponent = ({ title, playlistsToShow, showOnlySubscribed, sortByNewests, handleOnlySubscribed, handleSortByNewests}) => {

  return (
    <Container>
      <h3>
        {title}
        <span className="badge badge-secondary">{playlistsToShow.length}</span>
        <ButtonGroup className="float-right">
          { showOnlySubscribed !== undefined ?
          <Button variant="primary" onClick={handleOnlySubscribed}>
              { showOnlySubscribed ? "Show all" : "Show only subscribed"}
          </Button>:null
          }
          { sortByNewests !== undefined ?
          <Button variant="primary" onClick={handleSortByNewests}>
              { sortByNewests ? "Sort by likes" : "Sort by date" }
          </Button>:null
          }
        </ButtonGroup>
      </h3>
      <Row>
        {playlistsToShow.map((playlist, i) => (
          <Col className="mb-5" xs={12} sm={6} md={3} key={playlist.id_playlist}>
            <PlaylistPreview playlist={playlist} key={playlist.id_playlist} />
          </Col>
        ))}
        <Col xs={12} sm={6} md={3}>
          {location.href.split("/")[
            location.href.split("/").indexOf("#") + 1
          ] && <NewPlaylistForm />}
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistsComponent;
