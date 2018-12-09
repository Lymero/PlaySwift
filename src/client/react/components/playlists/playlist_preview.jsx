import React from "react";
import { Row, Col, ButtonToolbar, Button } from "react-bootstrap";
import Reactions from "react/components/reactions/reactions_component";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { playlist } = this.props;
    const toUrl = "/playlists/" + playlist["id_playlist"];
    return (
      <div>
        <h3>{playlist["name"]}</h3>
        <p>description: {playlist["description"]}</p>
        <p>creation_date: {playlist["creation_date"]}</p>
        <p>dislikes_number: {playlist["dislikes_number"]}</p>
        <p>id_tag: {playlist["id_tag"]}</p>
        <p>id_user: {playlist["id_user"]}</p>
        <p>last_update_date: {playlist["last_update_date"]}</p>
        <Reactions
          likes_number={playlist["likes_number"]}
          dislikes_number={playlist["dislikes_number"]}
        />
        <Nav.Link as={Link} to={toUrl}>
          <Button>Full Playlist!</Button>
        </Nav.Link>
      </div>
    );
  }
}

export default PlaylistPreview;
