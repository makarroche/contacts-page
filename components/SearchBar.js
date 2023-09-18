import { Form, InputGroup} from "../lib/ui.js";
import { Container, Row} from "react-bootstrap";

const SearchBar = () => {
  return (
      <Container>
      <Row className="justify-content-center">
        <InputGroup id = "search-bar" className="mb-4 mt-3">
        <Form.Control
          placeholder="Search by name or paste address/ENS"
          aria-label="Search by name or paste address/ENS"
          aria-describedby="search bar"
          className="gray-color border-0"
          
        />
        <InputGroup.Text id="basic-addon1" className="gray-color border-0">
          <img className="" id ="search-icon" src="/search.svg" alt="Bootstrap" width="15" height="15"></img>
            </InputGroup.Text>
        </InputGroup>
      </Row>
      </Container>
  );
};

export default SearchBar;
