import { useEffect, useState } from "react";
import { Col, Modal, Row, Form } from "react-bootstrap";
import { isAddress } from "ethers";
import { useEnsResolver } from 'wagmi'
import validator from "validator";
import ButtonContact from "@/components/ButtonContact";


const ContactModal = ({
  title,
  type,
  newContact,
  showContactModal,
  oldContact,
  removedContact,
}) => {

  const [contact, setContact] = useState({name: "", email: "", address: ""})
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(true);
  const { data, isError, isLoading } = useEnsResolver({
    name: `${contact.address}`,
  })

  useEffect(() => {
    if (contact.name || contact.address) setDisabled(contact.name && contact.address ? false : true);
  }, [contact.name, contact.email, contact.address]);

  useEffect(() => {
    if (type === "edit" && oldContact) {
      setAddress(oldContact?.address);
      setName(oldContact?.name);
      setEmail(oldContact?.email);
    }
  }, [oldContact]);

  const handleAddContact = () => {
    setError(false);     
    validateForm() ? newContact(contact) : '';
  };

  const handleEditContact = () => {
    validateForm ? newContact(contact) : '';
  };

  const handleRemoveContact = () => {
    removedContact(true);
  };

  const validateForm = () => {
    return isEmailValid() && isAddressOrENSValid();
  };

  const isEmailValid = () => {
    if(validator.isEmail(contact.email)){
      return true;
    }
    else{
      setError("Invalid Email!");
      return false
    }
  };

  const isAddressOrENSValid = () => {
    if (contact.address.length === 42) {
      if(!isAddress(contact.address)){
        setError("Invalid Address!");
        return false;
      }
      else{
        return true;
      }
    } else {
      resolverENS();
    }
  };

  const resolverENS = async () => {
    if (isLoading) return <div>Fetching resolver…</div>
    if (isError){
      setError('Invalid ENS');
      return false;
    }
    else{
      setAddress(data);
      return true;
    }
  }

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
                  {error && <Form.Label className="text-danger fw-bold ms-2">{error}</Form.Label>}
                  <Form.Control
                    className="gray-color"
                    type="walletOrENS"
                    placeholder={"0x..."}
                    maxLength="42"
                    value={contact.address}
                    onChange={(e) => setContact({...contact, address: e.target.value})}
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
                    value={contact.email}    
                    onChange={(e) => setContact({...contact, email: e.target.value})}
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
                    onChange={(e) => setContact({...contact, name: e.target.value})}
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
