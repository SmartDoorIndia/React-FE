// FeedbackModal
import React, { useState, useEffect } from 'react';
import { getTransactionViewVisitFeedback } from '../../../common/redux/actions';
import {Modal, Row, Col} from 'react-bootstrap';
import './FeedbackModal.scss'
import Text from '../../Text/Text';
import pinImage from "../../../assets/images/pin.png";
import {
  formateDate,
  handleStatusElement
} from "../../../common/helpers/Utils";
import StarRating from '../../StarRating/StarRating';

const FeedbackModal = (props) => {
    // const [show, setShow] = useState(false);

    const modalData = props.modalData;
    const [data, setData] = useState({});
    console.log(data,"data")

    console.log("feedback modal:", modalData);
  
    useEffect(() => {
        (async () => {
          if(modalData){
            try{                
                const res = await getTransactionViewVisitFeedback({visitId: modalData})
                setData(res.data.resourceData);
            }
                catch(err){
                console.log(err);
            }
        }})();
      }, [modalData]);

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

        {data && Object.keys(data).length?
           <Modal show={props.show} onHide={props.handleClose} className="mediumModal modal-dialog-centered" aria-labelledby="contained-modal-title-vcenter" centered>
           <Modal.Body>
             <Text size="medium" fontWeight="mediumbold" color="secondryColor" text="Visit Feedback" />
             {/* <Text size="Small" fontWeight="semibold" color="TaupeGrey" text="Lorem ipsum is simply a dummy text" /> */}
 
             <Row className="mt-3">
               <Col md={6} className="mb-4">
 <p className="badge-one mb-1">For { data.propertyCategory ==="Lease"? "RENT" : data.propertyCategory }</p>
 <img src={pinImage} alt="icon" className="mr-2" /><span className="text-gray">{`${data.houseNumber},${data.societyName === null ?"": data.societyName} ${data.propertyAddress === null ?"": data.propertyAddress}`}</span>
               </Col>
               <Col md={6} className="mb-4">
               <span className="text-gray fw-600 d-block mb-2">Visited Date</span>
               <Text size="Small" fontWeight="smbold" color="" text={data?.visitedDate ? formateDate(data?.visitedDate) : "-"} />
                 </Col>
                 <Col md={6}>
                 <h6 className="mb-2">Are you interested in this property ?</h6>
 
                 <span className="d-inline-block interested-status ml-0">
                 {/* //className="badge-two" */}
                   {/* <img src={checkedImage}  alt="icon" /> */}
                    {data?.interestedInProperty? handleStatusElement(data?.interestedInProperty): '-'}
                 </span>
                 </Col>
                 {data?.interestedInProperty === "Make an offer" ? 
                  <Col md={6}>
               <span className="text-gray fw-600 d-block mb-2">Offer Amount</span>
               <Text size="Small" fontWeight="smbold" color="" text={`₹${data?.offerAmount}`} />
                 </Col>
                 : null }
             </Row>
 
             <h6 className="mt-4 mb-3">Ratings</h6>
           <div className="mb-2">
           <div className="d-flex align-items-start ">
                <div>
                  <StarRating rating={data?.visitRating} />
                  {/* <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="(112 customers)" className="ml-1" /> */}
                </div>
              </div>
           </div>
 
             <Text size="Small" fontWeight="" color="" text={data?.visitReview} />
           </Modal.Body>
           <Modal.Footer className="border-0 justify-content-center">
             <button className='m-close-btn' onClick={props.handleClose}>
               Close
             </button>
            
           </Modal.Footer>
         </Modal>
        :null}
        
      </>
    );
  }
  
export default FeedbackModal;