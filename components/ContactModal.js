import { useState } from "react";
import { Form } from "../lib/ui.js";
import { Modal } from "react-bootstrap";
import ButtonContact from "@/components/ButtonContact";

const ContactModal = ({ title, type, onClick, newContact }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    //Verificar con ENS Resolver, poner max characters
    newContact({name, email, address});
  }, [onClick]);

  return (
    <Modal show animation={false} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-dark">
        <Form>
          <Form.Group className="mb-3" controlId="formAddressENS">
            <Form.Label>Wallet address or ENS</Form.Label>
            <Form.Control
              className="gray-color"
              type="walletOrENS"
              placeholder="0x..."
              value = {address}
              onChange = {setAddress}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Label className="ms-4 text-muted fw-light">
              Optional
            </Form.Label>
            <Form.Control
              className="gray-color"
              type="email"
              value={email}
              onChange = {setEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContactName">
            <Form.Label>Contact name</Form.Label>
            <Form.Control
              className="gray-color"
              type="contactName"
              placeholder="John Doe"
              value = {name}
              onChange = {setName}

            />
          </Form.Group>
          <div className="text-center">
            {type === "new" ? (
              <ButtonContact type="primary" text="Add contact" onClick={onClick} disabled></ButtonContact>
            ) : (
              <ButtonContact
                text="Are you sure you want to remove this contact"
                type="outline-primary"
                onClick={onClick}
              ></ButtonContact>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
