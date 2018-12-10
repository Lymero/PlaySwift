import React from "react";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";

const NewVideoComponent = ({ name, description, handleChange, addVideo }) => {
  return (
    <div>
      <h3>Add a new video</h3>
      <FormControl
        type="text"
        name="url"
        value={name}
        placeholder="Url"
        onChange={handleChange}
      />
      <FormControl
        type="text"
        name="description"
        value={description}
        placeholder="Description"
        onChange={handleChange}
      />
      <Button bsstyle="primary" onClick={addVideo}>
        Add
      </Button>
    </div>
  );
};

export default NewVideoComponent;
