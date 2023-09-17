import { useState } from "react";
import { Form } from "../lib/ui.js";
import FilledButton from "./FilledButton.js";
import OutlineButton from "./OutlineButton.js";

const Modal = ({title, type}) => {

  //if type add, o remove mostrar los diferentes botones
  //que anda la cruz

  const [show, setShow] = useState(false);

    return(
      <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
       {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-dark">
      <Form>
        <Form.Group className="mb-3" controlId="formAddressENS">
        <img src="/cross.svg" alt="Bootstrap" width="32" height="32"></img>
          <Form.Label>Wallet address or ENS</Form.Label>
          <Form.Control type="walletOrENS" placeholder="0x..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Label>Optional</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContactName">
          <Form.Label>Contact name</Form.Label>
          <Form.Control type="contactName" label="John Doe" />
        </Form.Group>
        {type === 1  ? <FilledButton text="Add contact"></FilledButton>
        : <OutlineButton text="Are you sure you want to remove this contact"></OutlineButton>}
      </Form>
      </Modal.Body>
    </Modal>
  
    );


   
}

export default Modal;