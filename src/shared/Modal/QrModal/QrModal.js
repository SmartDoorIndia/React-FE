// QrModal
import React, {  } from 'react';
import { Modal } from 'react-bootstrap';
import './QrModal.scss'
import Text from '../../Text/Text';

import QRCode from 'react-qr-code';

const QrModal = (props) => {
    // const [show, setShow] = useState(false);
    // const qrCodeRef = useRef(null); // create a ref for the QR code element

    console.log(props, "inside msg modal props")
    // const modalData = props.modalData;
    // const [data, setData] = useState({});

    // const [message, setMessage] = useState('')

    console.log(props, "qr data modal")

    function handlePrintClick() {
        const printContents = '<div style="display:flex;justify-content:center;align-items:center;height:100%;"><div id="qrcode">' + document.getElementById("qrcode").innerHTML + '</div></div>';
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>QR Code</title>');
        printWindow.document.write('<style>@media print{body {margin: 0;}}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    

    // useEffect(()=>{},[modalData])

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} className="mediumModal modal-dialog-centered" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body className='text-center mx-auto'>
                    <>
                        <Text
                            size="large"
                            fontWeight="mediumbold"
                            color="secondry-color"
                            text={props.headerText}
                        />

                        <Text size="body" fontWeight="mediumbold" color="secondry-color" text={props.subHeaderText} className=" fs14 mt-3" />

                        <div id='qrcode' className='qrcode'>
                            <QRCode
                                id="printable"
                                title="Property QR"
                                value={JSON.stringify(props.qrData)}
                                // bgColor="background-color"
                                // fgcolor="foreground-color"
                                size={256}
                            />
                        </div>
                    </>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center">
                    <button className='m-close-btn' onClick={props.handleClose} >
                        Close
                    </button>
                    <button className='m-close-btn' onClick={handlePrintClick} >
                        Print
                    </button>

                    {/* <button className='m-send-btn' onClick={props.modulename === "realtor" ? () => props.declineRealtor(message) : sendMsgHandler} >Send</button> */}
                    {/* <Buttons
                  name={"send"}
                  type="submit"
                  size="xxLarge"
                  color="primary"
                  // className="w-100 float-right  mr-2"
                  onClick={() => {
                      // handleRealtorStatus(advisor.advisorId, "ACCEPTED")
                  }}
                /> */}

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default QrModal;