import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Likes = ({ likes_number }) => {
  return (
    <Button variant="outline-primary">
      {likes_number} <FontAwesomeIcon icon={faThumbsUp} />
    </Button>
  );
};

export default Likes;
