import Button from 'react-bootstrap/Button';
import {Row} from "../lib/ui.js";
import { Toast, ToastContainer } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const TooltipCopy = ({showTooltip}) => {
  const [show, setShow] = useState();

  const handleCloseTooltip = () => {
    setShow(false);
    showTooltip(false);
  }

return (
  <ToastContainer className="top-start">
    <Toast  onClose={handleCloseTooltip} show={show} delay={2000} autohide className='bg-dark text-white'>
      <Toast.Body> <small>Wallet address copied</small></Toast.Body>
    </Toast>
    </ToastContainer>
  );
};

export default TooltipCopy;
