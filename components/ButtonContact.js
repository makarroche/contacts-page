import { Button } from "react-bootstrap";



const ButtonContact = ({type, text, onClick, disabled}) => {
    return (
     <Button variant={type} onClick={onClick} disabled={disabled}>{text}</Button>
    );

}

export default ButtonContact;
