import React from "react";

import { Form, FormControl, Button } from "react-bootstrap";

const SearchForm = ({ filter, handleChange, search }) => {
  return (
    <Form inline onSubmit={search}>
      <FormControl
        type="text"
        name="filter"
        value={filter}
        placeholder="Search"
        className="mr-sm-2"
        onChange={handleChange}
      />
      <Button variant="outline-info" onClick={search}>
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
