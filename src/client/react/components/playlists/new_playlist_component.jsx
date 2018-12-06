import React from "react";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";

const NewPlaylistComponent = ({
  name,
  description,
  tag,
  handleChange,
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

      {/* <FormGroup controlId="formControlsSelect">
        <ControlLabel>Tag</ControlLabel>
        <FormControl componentClass="select" placeholder="tag">
          <option selected="true" value="" disabled="disabled">
            Chose tag
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
        </FormControl>
      </FormGroup> */}

      <Button bsstyle="primary" onClick={addPlaylist}>
        Add
      </Button>
    </div>
  );
};

export default NewPlaylistComponent;
