import React from "react";

import { InputGroup, FormControl, Button } from "react-bootstrap";

const SearchForm = ({ filter, handleChange, search, onSubmit }) => {
  return (

    <InputGroup>
      <FormControl
        type="text"
        name="filter"
        value={filter}
        placeholder="Search"
        className=""
        onChange={handleChange}
      />
      <InputGroup.Append>
        <Button variant="outline-info" onClick={search} onSubmit={onSubmit}>
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchForm;
