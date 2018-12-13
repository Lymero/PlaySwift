import React from "react";
import {
  Form,
  FormControl,
  Card,
  Button,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";

const NewPlaylistComponent = ({
  name,
  description,
  filteredTags,
  tag,
  tagFilter,
  handleChange,
  filterTags,
  addPlaylist
}) => {
  return (
    <Card className="floatHover flex-fill">
      <Card.Header>Add a new playlist</Card.Header>
      <Card.Body>
        <Card.Text>Add a new playlist by filling this form</Card.Text>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <FormControl
            className="mb-2"
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={handleChange}
            autoComplete="off"
          />
          <FormControl
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={handleChange}
            autoComplete="off"
          />
        </ListGroupItem>
        <ListGroupItem>
          <Form.Check
            type="checkbox"
            name="visible"
            label="private"
            onChange={handleChange}
            inline
          />
        </ListGroupItem>
        <ListGroupItem>
          <FormControl
            type="text"
            name="tagFilter"
            value={tagFilter}
            placeholder="Tag"
            onChange={handleChange}
            autoComplete="off"
          />
        </ListGroupItem>
      </ListGroup>

      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control
          as="select"
          multiple
          name="tag"
          className="suggestionsSelect"
          onChange={handleChange}
        >
          {filteredTags !== undefined &&
            filteredTags.map((tag, i) => (
              <option value={tag.id_tag} key={i}>
                {tag.tag_name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" className="addBtn" onClick={addPlaylist}>
        Add this playlist
      </Button>
    </Card>
  );
};

export default NewPlaylistComponent;
