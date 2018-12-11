import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Likes = ({ likes_number, addReaction }) => {
  return (
    <Button variant="primary" onClick={addReaction}>
      {likes_number} <FontAwesomeIcon icon={faThumbsUp} />
    </Button>
  );
};

export default Likes;
