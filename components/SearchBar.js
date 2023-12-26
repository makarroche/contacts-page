import { useEffect, useState } from "react";
import { Container, Row, Form, InputGroup} from "react-bootstrap";

const SearchBar = ({searchWord}) => {

  const [search, setSearch] = useState();

  useEffect(() => {
    searchWord(search);
  }, [search]);

  return (
      <Container>
      <Row className="justify-content-center">
        <InputGroup id = "search-bar" className="mb-4 mt-3">
        <Form.Control
          placeholder="Search by name or paste address/ENS"
          aria-label="Search by name or paste address/ENS"
          aria-describedby="search bar"
          className="gray-color border-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          
        />
        <InputGroup.Text id="basic-addon1" className="gray-color border-0">
          <img id ="search-icon" src="/search.svg" alt="Bootstrap" width="15" height="15"></img>
            </InputGroup.Text>
        </InputGroup>
      </Row>
      </Container>
  );
};

export default SearchBar;
