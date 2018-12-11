import React from "react";
import {
  Button,
  Card,
  CardImg,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import Reactions from "react/components/reactions/reactions_component";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withPlaylists } from "react/context/playlists";
import DateUtils from "react/utils/date";

class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
    this.playlist = this.props.playlist;
    this.ctxRemovePlaylist = this.props.removePlaylist;
    this.removePlaylist = this.removePlaylist.bind(this);
  }

  removePlaylist(event) {
    event.preventDefault();
    const body = {
      id_playlist: this.playlist.id_playlist
    };
    this.ctxRemovePlaylist(body);
  }

  render() {
    const playlist = this.playlist;
    const toUrl = "/playlists/" + playlist["id_playlist"];
    return (
      <Card className="floatHover h-100">
        <CardImg
          variant="top"
          width="100%"
          src={playlist["url_thumbnail"]}
          alt="Card image cap"
        />
        <Card.Body>
          <Card.Title>
            <h3>{playlist["name"]}</h3>
          </Card.Title>
          <Card.Text>
            <p>{playlist["description"]}</p>
          </Card.Text>
          <Reactions
            className="float-right"
            likes_number={playlist["likes_number"]}
            dislikes_number={playlist["dislikes_number"]}
          />
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <strong>Tag </strong>
            <span>{playlist["tag_name"]}</span>
          </ListGroupItem>
          <ListGroupItem>
            <strong>Créé le </strong>
            <span>{DateUtils.toReadable(playlist["creation_date"])}</span>
          </ListGroupItem>
          <ListGroupItem>
            <strong>Modifié le </strong>
            <span>{DateUtils.toReadable(playlist["last_update_date"])}</span>
          </ListGroupItem>
        </ListGroup>
        <Nav.Link as={Link} to={toUrl}>
          <Button>Full Playlist!</Button>
        </Nav.Link>
      </Card>
    );
  }
}

export default withPlaylists(PlaylistPreview);
