import { useState, useRef } from "react";
import { Toast } from "react-bootstrap";
import {Row} from "../lib/ui.js";

const ToastOptions = () => {
  return (
    <Toast>
      <Toast.Body>
        {" "}
        <Row>
        <strong>Copy address</strong>
        </Row>
        <Row>
        <strong>Edit contact</strong>
        </Row>
       <Row><strong className="text-danger">Remove contact</strong>
       </Row> 
      </Toast.Body>
    </Toast>
  );
};

export default ToastOptions;
