import React from "react";

import Form from "react-bootstrap/lib/Form";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

const SearchForm = ({ filter, handleChange, search, onSubmit }) => {
  return (
    <Form inline>
      <FormControl
        type="text"
        name="filter"
        value={filter}
        placeholder="Search"
        className="mr-sm-2"
        onChange={handleChange}
      />
      <Button variant="outline-info" onClick={search} onSubmit={onSubmit}>
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
