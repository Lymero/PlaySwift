import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  ButtonToolbar,
  Button,
  Badge,
  Card,
  CardImg,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import Reactions from "react/components/reactions/reactions_component";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { withPlaylists } from "react/context/playlists";
import DateUtils from "react/utils/date";
import {
  faThumbsDown,
  faThumbsUp,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
    this.playlist = this.props.playlist;
    this.goToPlaylist = this.goToPlaylist.bind(this);
    this.ctxRemovePlaylist = this.props.removePlaylist;
    this.removePlaylist = this.removePlaylist.bind(this);
  }

  goToPlaylist() {
    const toUrl = "/playlists/" + this.props.playlist["id_playlist"];
    this.props.history.push(toUrl);
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
    if (playlist["url_thumbnail"] === null)
      playlist["url_thumbnail"] = "https://place-hold.it/16x9/212425";
    return (
      <div>
        <Card className="floatHover h-100">
          {playlist.id_user === this.props.userId && (
            <Button variant="danger" onClick={this.removePlaylist}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          )}
          <CardImg
            variant="top"
            width="100%"
            src={playlist["url_thumbnail"]}
            alt="Playlist preview thumbnail"
            onClick={this.goToPlaylist}
          />
          <Card.Body onClick={this.goToPlaylist}>
            <Card.Title>
              <h3>{playlist["name"]}</h3>
            </Card.Title>
            <Card.Text>{playlist["description"]}</Card.Text>
            <h4 className="joinedBadges bottomRightCardBody">
              <Badge variant="primary">
                {playlist["likes_number"]} <FontAwesomeIcon icon={faThumbsUp} />
              </Badge>
              <Badge variant="danger">
                {playlist["dislikes_number"]}{" "}
                <FontAwesomeIcon icon={faThumbsDown} />
              </Badge>
            </h4>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <strong>Tag </strong>
              <span>{playlist["tag_name"]}</span>
            </ListGroupItem>
            <ListGroupItem>
              <strong>Created on </strong>
              <span>{DateUtils.toReadable(playlist["creation_date"])}</span>
            </ListGroupItem>
            <ListGroupItem>
              <strong>Modified on </strong>
              <span>{DateUtils.toReadable(playlist["last_update_date"])}</span>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.usersSession.userId
  };
};

export default connect(mapStateToProps)(
  withPlaylists(withRouter(PlaylistPreview))
);
