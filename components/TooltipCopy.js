import Button from 'react-bootstrap/Button';
import {OverlayTrigger, Popover} from "../lib/ui.js";

const TooltipCopy = () => {

return (
       <>
  
        <OverlayTrigger
          trigger="click"
          key="top"
          placement="top"
          overlay={
            <Popover id={`popover-positioned-top}`}>
              <Popover.Body>
              Wallet address copied
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Popover</Button>
        </OverlayTrigger>

    </>
  );
};

export default TooltipCopy;