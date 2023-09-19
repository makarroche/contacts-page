import { useEffect, useState } from "react";
import { useEnsResolver } from "wagmi";
import validator from "validator";
import { Form } from "../lib/ui.js";
import { Col, Modal, Row } from "react-bootstrap";
import ButtonContact from "@/components/ButtonContact";
import { isAddress } from "ethers";

const ContactModal = ({
  title,
  type,
  newContact,
  showContactModal,
  oldContact,
  removedContact,
}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (name || address) setDisabled(name && address ? false : true);
  }, [name, email, address]);

  useEffect(() => {
    if (type === "edit" && oldContact) {
      setAddress(oldContact?.address);
      setName(oldContact?.name);
      setEmail(oldContact?.email);
    }
  }, [oldContact]);

  const handleAddContact = () => {
    validateForm ? newContact({ name, email, address }) : setError("Error");
  };

  const handleEditContact = () => {
    validateForm ? newContact({ name, email, address }) : setError("Error");
  };

  const handleRemoveContact = () => {
    removedContact(true);
  };

  const validateForm = () => {
    return isEmailValid && isAddressOrENSValid;
  };

  const isEmailValid = () => {
    return validator.isEmail(email);
  };

  const isAddressOrENSValid = () => {
    //check address not repeats
    if (address.length === 42) {
      return isAddress(address);
    } else {
      const { data, isError, isLoading } = useEnsResolver({
        name: address,
      });
      if (isLoading) return <div>Fetching resolver…</div>;
      if (isError) return <div>Error fetching resolver</div>;
      console.log(Resolver, JSON.stringify(data));
    }
  };

  const handleClose = () => {
    showContactModal(false);
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title className={type === "remove" ? "text-center" : ""}>
            {type === "remove"
              ? "Are you sure you want to remove this contact"
              : title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <Form>
            {type != "remove" && (
              <>
                <Form.Group className="mb-3" controlId="formAddressENS">
                  <Form.Label>Wallet address or ENS</Form.Label>
                  <Form.Control
                    className="gray-color"
                    type="walletOrENS"
                    placeholder={"0x..."}
                    maxLength="42"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Row>
                    <Col xs={6} md={4}>
                      <Form.Label>Email</Form.Label>
                    </Col>
                    <Col
                      xs={6}
                      md={4}
                      className="text-muted fw-light d-flex justify-content-end"
                    >
                      Optional
                    </Col>
                  </Row>
                  <Form.Control
                    className="gray-color"
                    maxLength="30"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContactName">
                  <Form.Label>Contact name</Form.Label>
                  <Form.Control
                    className="gray-color"
                    type="contactName"
                    placeholder="John Doe"
                    maxLength="20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
            <div className="text-center">
              {type === "new" ? (
                <ButtonContact
                  type="primary"
                  text="Add contact"
                  onClick={handleAddContact}
                  disabled={disabled}
                ></ButtonContact>
              ) : type === "remove" ? (
                <ButtonContact
                  text="Yes, remove contact"
                  type="outline-danger"
                  onClick={handleRemoveContact}
                ></ButtonContact>
              ) : (
                <ButtonContact
                  text="Save edits"
                  type="primary"
                  onClick={handleEditContact}
                ></ButtonContact>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default ContactModal;
