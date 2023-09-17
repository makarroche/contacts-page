import { Form, InputGroup } from "../lib/ui.js";


const SearchBar = () => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search by name or paste address/ENS"
        aria-label="Search by name or paste address/ENS"
        aria-describedby="search bar"
      />
       <InputGroup.Text id="basic-addon1">
        <img src="/search.svg" alt="Bootstrap" width="32" height="32"></img>
          </InputGroup.Text>
    </InputGroup>
   
  );
};

export default SearchBar;
