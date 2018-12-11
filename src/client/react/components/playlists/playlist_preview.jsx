import React from "react";
import { Row, Col, ButtonToolbar, Button } from "react-bootstrap";
import Reactions from "react/components/reactions/reactions_component";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {withPlaylists} from 'react/context/playlists';
class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
    this.playlist = this.props.playlist;
  }
  
  render() {
    const playlist = this.playlist;
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

export default withPlaylists(PlaylistPreview);
