// FeedbackModal
import React, { useState } from 'react';
import { sendMsgToOwner } from '../../../common/redux/actions';
import { Modal } from 'react-bootstrap';
import './MessageModal.scss'
import Text from '../../Text/Text';
import TextArea from '../../Inputs/TextArea/TextArea';

const MessageModal = (props) => {
  // const [show, setShow] = useState(false);
  console.log(props, "inside msg modal props")
  // const modalData = props.modalData;
  // const [data, setData] = useState({});

  const [message, setMessage] = useState('')

  console.log(props, "msg modal")

  const sendMsgHandler = () => {

    console.log(props.userId, props.ownerId, "msg id")
    sendMsgToOwner({ id: props.ownerId, loginId: props.userId, comments: message })
      .then((response) => {
        // setLoading(false);
        if (response.data) {
          if (response.data.status === 200) {
            props.handleClose()
            setMessage('')
            // _getPropertyDetails();
            // getPropertyAnalyticsByPropertyId({ propertyId: propertyId });
            console.log(response, "send msggggggggggggggggggggggggg")
            // setpropertyData(response.data.resourceData);
          }
        }
        console.log('responsemsgToOwner', response);
      })
      .catch((error) => {
        // setLoading(false);
        console.log('error', error)
      })

  }

  // useEffect(()=>{},[modalData])

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

      {/* <Modal show={props.show} onHide={props.handleClose}
        >
          <Modal.Header closeButton onClick={() => props.history.goBack()}>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.history.goBack()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => props.history.goBack()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> */}


      <Modal show={props.show} onHide={props.handleClose} className="mediumModal modal-dialog-centered" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <>

            <Text
              size="large"
              fontWeight="mediumbold"
              color="secondry-color"
              text={props.headerText}
            />
            {/* <div className="newEntry"> */}
              {/* <form noValidate autoComplete="off"> */}
                {/* <Row> */}
                  {/* <Col lg="8"> */}
                    {/* <div>Message</div> */}
                    <Text size="body" fontWeight="mediumbold" color="secondry-color" text={props.subHeaderText} className=" fs14 mt-3" />

                    {/* <Form.Group controlId="formBasicContact"> */}
                      {/* <Form.Label>Enter Message</Form.Label>
                      <Form.Control
                        type="text"
                        //  maxlength="35"
                        placeholder="Enter Here.."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      /> */}
                      <TextArea
                        id="description"
                        label="Enter Message"
                        rows="6"
                        placeholder="Enter Here..."
                        style={{ "maxHeight": "132px" }}
                        value={message}
                        className="messagesModalWidth"
                        onChange={(e) => setMessage(e.target.value)}
                      //  defaultValue={ projectData?.description }
                      //  { ...register("description") }
                      />
                    {/* </Form.Group> */}
                    <Text
                      color="dangerText"
                      size="xSmall"
                      className="pt-2"
                    // text={error.contactPerson}
                    />
                  {/* </Col> */}


                {/* </Row> */}

              {/* </form> */}
            {/* </div> */}

          </>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <button  className='m-close-btn' onClick={() => { props.handleClose(); setMessage('') }} >
            Close
            </button>

          <button className='m-send-btn' onClick={props.modulename==="realtor" ? ()=>props.declineRealtor(message) : sendMsgHandler} >Send</button>
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

export default MessageModal;