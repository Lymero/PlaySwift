import React from "react";

import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

const SearchForm = ({ filter, handleChange, search }) => {
  return (
    <Form inline onSubmit={search}>
      <InputGroup>
        <FormControl
          type="text"
          name="filter"
          value={filter}
          placeholder="Search"
          className=""
          onChange={handleChange}
          autocomplete="off"
        />
        <InputGroup.Append>
          <Button variant="outline-info" onClick={search}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default SearchForm;
