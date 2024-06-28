/** @format */

import { Modal } from 'react-bootstrap';
import '../ModalModule.scss';

const SideModal = (props) => {
  console.log("props:side modal::", props);
  return (
    <Modal
      show={ props.show }
      onHide={ props.handleClose }
      className="sideModalDialog slide_modal"
      backdrop>
      {props.show ? <div className="modalBg">{props.children}</div>: ''}
    </Modal>
  );
};

export default SideModal;
