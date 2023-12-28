import { Button } from "react-bootstrap";

const ButtonContact = ({ type, text, onClick, disabled, setShowToast }) => {
  const handleOnClick = () => {
    if (text === "Add new contact") setShowToast(false);
    onClick(true);
  };

  return (
    <Button
      id="add-new-contact"
      className="text-white"
      variant={type}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default ButtonContact;
