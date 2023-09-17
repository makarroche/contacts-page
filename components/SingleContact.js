import { useState } from "react";
import { Col, Row, Container, Button } from "../lib/ui.js";

const SingleContact = () => {
  return (
    <Container>
      <Col>
        <Row>
          <p>Andree Parra</p>
          <Col>
      <img src="/threeDot.svg" alt="Bootstrap" width="32" height="32" onClick={''}></img>
      </Col>
        </Row>
        <Row>
          <p className="text-secondary">0x92d...aaE45</p>
        </Row>
      </Col>
    </Container>
  );
};

export default SingleContact;
