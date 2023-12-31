import { useEffect, useState } from "react";
import { Col, Modal, Row, Form } from "react-bootstrap";
import { isAddress } from "ethers";
import { useEnsResolver } from "wagmi";
import validator from "validator";
import ButtonContact from "@/components/ButtonContact";

const ContactModal = ({
  type,
  showContactModal,
  newContact,
  oldContact,
  removedContact,
  setThreeDotAction,
  contacts,
}) => {
  const [contact, setContact] = useState({ name: "", email: "", address: "" });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(true);
  const { data, isError, isLoading } = useEnsResolver({
    name: `${contact.address}`,
  });

  useEffect(() => {
    if (contact.name || contact.address)
      setDisabled(contact.name && contact.address ? false : true);
  }, [contact.name, contact.email, contact.address]);

  useEffect(() => {
    if (type === "Edit" && oldContact) {
      setContact({
        address: oldContact?.address,
        name: oldContact?.name,
        email: oldContact?.email,
      });
    }
  }, [oldContact]);

  const handleAddContact = async () => {
    setError(false);
    if (await validateForm()) {
      newContact(contact);
      showContactModal(false);
    }
  };

  const handleEditContact = () => {
    if (validateForm()) {
      newContact(contact);
      showContactModal(false);
      setShow(false);
    }
  };

  const handleRemoveContact = () => {
    removedContact(true);
    showContactModal(false);
    setShow(false);
  };

  const validateForm = async () => {
    return (
      isEmailValid() && (await isAddressOrENSValid()) && addressAlreadyExists()
    );
  };

  const isEmailValid = () => {
    if (validator.isEmail(contact.email)) {
      return true;
    } else {
      setError("Invalid Email!");
      return false;
    }
  };

  const isAddressOrENSValid = async () => {
    if (contact.address.length === 42) {
      if (!isAddress(contact.address)) {
        setError("Invalid Address!");
        return false;
      } else {
        return true;
      }
    } else {
      if (await resolverENS()) {
        return true;
      } else {
        return false;
      }
    }
  };

  const resolverENS = async () => {
    if (isLoading) return <div>Fetching resolver…</div>;
    if (isError) {
      setError("Error loading ENS");
      return false;
    } else if (data) {
      if (data === "0x0000000000000000000000000000000000000000") {
        setError("Invalid ENS");
        return false;
      } else {
        return true;
      }
    }
  };

  const handleClose = () => {
    showContactModal(false);
    setShow(false);
    if (type != "New") setThreeDotAction("");
  };

  const addressAlreadyExists = () => {
    if (type === "New") {
      if (contacts.find((item) => item.address === contact.address)) {
        setError("Address already exists");
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={true}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="modal-background" closeButton>
        <Modal.Title
          className={
            type === "Remove" ? "text-center text-white" : "text-white"
          }
        >
          {type === "Remove"
            ? "Are you sure you want to remove this contact"
            : `${type} Contact`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-white modal-background">
        <Form>
          {type != "Remove" && (
            <>
              <Form.Group className="mb-3" controlId="formAddressENS">
                <Form.Label>Wallet address or ENS</Form.Label>
                {error && (
                  <Form.Label className="text-danger fw-bold ms-2">
                    {error}
                  </Form.Label>
                )}
                <Form.Control
                  className="gray-color"
                  type="walletOrENS"
                  placeholder={"0x..."}
                  maxLength="42"
                  value={contact.address}
                  onChange={(e) =>
                    setContact({ ...contact, address: e.target.value })
                  }
                  disabled={type === "Edit" ? true : false}
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
                    id="optional"
                    className="text-white fw-light d-flex justify-content-end"
                  >
                    Optional
                  </Col>
                </Row>
                <Form.Control
                  className="gray-color"
                  maxLength="30"
                  type="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formContactName">
                <Form.Label>Contact name</Form.Label>
                <Form.Control
                  className="gray-color"
                  type="contactName"
                  placeholder="John Doe"
                  maxLength="20"
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                />
              </Form.Group>
            </>
          )}
          <div className="text-center">
            {type === "New" ? (
              <ButtonContact
                type="secondary"
                text="Add contact"
                onClick={handleAddContact}
                disabled={disabled}
              ></ButtonContact>
            ) : type === "Remove" ? (
              <ButtonContact
                text="Yes, remove contact"
                type="outline-danger"
                onClick={handleRemoveContact}
              ></ButtonContact>
            ) : (
              <ButtonContact
                text="Save edits"
                type="secondary"
                onClick={handleEditContact}
                disabled={disabled}
              ></ButtonContact>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
