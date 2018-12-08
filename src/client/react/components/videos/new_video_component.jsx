import React from "react";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";

const NewVideoComponent = ({ url, description, handleChange, addVideo }) => {
  return (
    <div>
      <h3>Add a new video</h3>
      <FormControl
        type="text"
        url="url"
        value={url}
        placeholder="url"
        onChange={handleChange}
      />

      <FormControl
        type="text"
        url="description"
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

      <Button bsstyle="primary" onClick={addVideo}>
        Add
      </Button>
    </div>
  );
};

export default NewVideoComponent;
