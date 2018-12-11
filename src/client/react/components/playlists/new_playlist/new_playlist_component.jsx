import React from "react";
import {
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
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
    <div>
      <h3>Add a new playlist</h3>
      <FormControl
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={handleChange}
      />
      <FormControl
        type="text"
        name="description"
        value={description}
        placeholder="Description"
        onChange={handleChange}
      />
      <Form.Check
        type="checkbox"
        name="visible"
        label="private"
        onChange={handleChange}
        inline
      />
      <FormControl
        type="text"
        name="tagFilter"
        value={tagFilter}
        placeholder="Tag"
        onChange={handleChange}
      />
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control as="select" multiple name="tag" onChange={handleChange}>
          {filteredTags !== undefined &&
            filteredTags.map((tag, i) => (
              <option value={tag.id_tag} key={i}>
                {tag.tag_name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>

      <Button bsstyle="primary" onClick={addPlaylist}>
        Add
      </Button>
    </div>
  );
};

export default NewPlaylistComponent;
