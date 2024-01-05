/** @format */

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = () => {
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={ handleShow }>
        Launch demo modal
      </Button>
      <Modal show={ show } onHide={ handleClose } centered>
        <Modal.Header>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="primary" onClick={ handleClose }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
