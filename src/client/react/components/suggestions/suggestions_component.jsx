import React from "react";
import { Button } from "react-bootstrap";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SuggestionManage = ({ accept, refuse }) => {
  return (
    <div>
      <Button variant="info" onClick={accept}>
        Accept
      </Button>
      <Button variant="info" onClick={refuse}>
        Refuser
      </Button>
    </div>
  );
};

export default SuggestionManage;
