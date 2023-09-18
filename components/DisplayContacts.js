import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ButtonContact from "@/components/ButtonContact";
import ContactModal from "@/components/ContactModal";

const DisplayContacts = () => {
  const [contacts, setContacts] = useState();
  const [showContactModal, setShowContactModal] = useState(false);
  const [newContactClick, setNewContactClick] = useState(false);
  const [newContact, setNewContact] = useState();

  useEffect(() => {
   handleAddContact();
  }, [newContactClick]);

  const handleAddContact = () => {
    //contacts.push(newContact);
  }

  return (
    <Container className="h-75 d-inline-block">
      <Row>
        <p className="fw-bold mt-2">All contacts (0)</p>
      </Row>
      <Row className="text-center mt-4">
        {contacts ? contacts.map(contact => 
            <Row className="text-center mt-4">
                <Col>{contact.name}</Col>
                <Col>{contact.address}</Col>
            </Row>
            )
        : <p>No results</p>}
      </Row>
      <Row className="justify-content-center mx-3 fixed-bottom mb-4">
        <ButtonContact
          type="outline-primary"
          text="Add new contact"
          onClick={setShowContactModal}
          disabled={false}
        ></ButtonContact>
      </Row>
      {showContactModal ? <ContactModal title = "New contact" type = "new" onClick={setNewContactClick} newContact={setNewContact}></ContactModal> : ''}
    </Container>
  );
};

export default DisplayContacts;
