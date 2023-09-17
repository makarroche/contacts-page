import {Button} from "../lib/ui.js";


const TheButton = ({type, text}) => {
    return (
     <Button variant={type}>{text}</Button>
    );

}

export default TheButton;
