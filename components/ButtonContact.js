import { Button } from "react-bootstrap";



const ButtonContact = ({type, text, onClick, disabled}) => {
    return (
     <Button className = "text-white" variant={type} onClick={onClick} disabled={disabled}>{text}</Button>
    );

}

export default ButtonContact;
