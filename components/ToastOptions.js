import { Toast, ToastContainer, Row } from "react-bootstrap";

const ToastOptions = ({setThreeDotAction, setShowToast}) => {
  
  const handleActionOnClick = (action) => {
    setThreeDotAction(action);
    setShowToast(false);
  }

  return (
    <ToastContainer className="top-start mt-4">
      <Toast>
        <Toast.Body>
          {" "}
          <Row className = "onHover">
            <strong>
              <a onClick={() => handleActionOnClick("Copy")}>Copy address</a>
            </strong>
          </Row>
          <Row className = "onHover">
            <strong>
              <a onClick={() => handleActionOnClick("Edit")}>Edit contact</a>
            </strong>
          </Row>
          <Row className = "onHover">
            <strong className="text-danger">
              <a onClick={() => handleActionOnClick("Remove")}>Remove contact</a>
            </strong>
          </Row>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastOptions;
