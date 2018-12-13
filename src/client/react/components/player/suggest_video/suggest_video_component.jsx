import React from "react";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";

const SuggestVideoComponent = ({ url, handleChange, suggestVideo }) => {
  return (
    <div>
      <h3>Suggest a video</h3>
      <FormControl
        type="text"
        name="url"
        value={url}
        placeholder="Url"
        onChange={handleChange}
        autoComplete="off"
      />
      <Button bsstyle="primary" onClick={suggestVideo}>
        Suggest
      </Button>
    </div>
  );
};

export default SuggestVideoComponent;
