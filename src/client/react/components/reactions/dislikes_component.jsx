import React from "react";
import { Button } from "react-bootstrap";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dislikes = ({ dislikes_number }) => {
  return (
    <Button>
      {dislikes_number} <FontAwesomeIcon icon={faThumbsDown} />
    </Button>
  );
};

export default Dislikes;
