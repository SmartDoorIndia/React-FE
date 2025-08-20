import React from 'react'
import { Modal } from 'react-bootstrap';
import closeIcon from '../../assets/images/closeBtn.png';

const ImageEnlargeModal = ({ show, handleClose, selectedImage }) => {
    return (
        <>
            <Modal size='md' show={show} onHide={handleClose} centered backdrop={'static'} >
                <Modal.Body >
                    <div className='d-flex' style={{ justifyContent: 'center' }}>
                        <img
                            src={closeIcon}
                            alt=""
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                height: '40px',
                                width: '40px',
                                cursor: 'pointer'
                            }}
                            onClick={() => { handleClose(); }}
                        />
                        <img src={selectedImage} alt='' style={{ height: '400px', width: '400px' }} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ImageEnlargeModal