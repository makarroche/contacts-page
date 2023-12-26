import { Toast, ToastContainer, Row } from "react-bootstrap";

const ToastOptions = ({copyAddressClick, editContactClick, removeContactClick}) => {
  
  const handleCopyAddressClick = () => {
    copyAddressClick(true);
  }

  const handleEditContactClick = () => {
    editContactClick(true);
  }

  const handleRemoveContactClick = () => {
    removeContactClick(true);
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
