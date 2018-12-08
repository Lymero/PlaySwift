import React from "react";
import { ButtonToolbar, ButtonGroup } from "react-bootstrap";
import Like from "./likes_component";
import Dislike from "./dislikes_component";

const ReactionsComponent = ({ likes_number, dislikes_number }) => {
  return (
    <ButtonToolbar>
      <ButtonGroup>
        <Like likes_number={likes_number} />
        <Dislike dislikes_number={dislikes_number} />
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default ReactionsComponent;
