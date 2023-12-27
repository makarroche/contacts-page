import { Button } from "react-bootstrap";



const ButtonContact = ({type, text, onClick, disabled}) => {
    return (
     <Button id ="add-new-contact" className = "text-white" variant={type} onClick={onClick} disabled={disabled}>{text}</Button>
    );

}

export default ButtonContact;
