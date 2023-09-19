import { useState, useRef } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Row } from "../lib/ui.js";

const ToastOptions = ({copyAddressClick, editContactClick, removeContactClick, contactKey, keyClicked}) => {
  
  const handleCopyAddressClick = () => {
    copyAddressClick(true);
    contactKey(keyClicked);
  }

  const handleEditContactClick = () => {
    editContactClick(true);
    contactKey(keyClicked);
  }

  const handleRemoveContactClick = () => {
    removeContactClick(true);
    contactKey(keyClicked);
  }

  return (
    <ToastContainer className="top-start mt-4">
      <Toast>
        <Toast.Body>
          {" "}
          <Row>
            <strong>
              <a onClick={handleCopyAddressClick}>Copy address</a>
            </strong>
          </Row>
          <Row>
            <strong>
              <a onClick={handleEditContactClick}>Edit contact</a>
            </strong>
          </Row>
          <Row>
            <strong className="text-danger">
              <a onClick={handleRemoveContactClick}>Remove contact</a>
            </strong>
          </Row>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastOptions;
