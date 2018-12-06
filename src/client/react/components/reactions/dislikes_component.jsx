import React from "react";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

const Dislikes = ({ dislikes_number }) => {
  return (
    <Button>
      <FontAwesome name="rocket" />
      Dislikes = {dislikes_number}
    </Button>
  );
};

export default Dislikes;
