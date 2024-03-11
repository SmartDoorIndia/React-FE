import  React,{useState,useEffect} from "react";
import {Modal, Row, Col} from 'react-bootstrap';
import { getBrokerDetails } from '../../../common/redux/actions';
import { useParams } from "react-router-dom";
import TextArea from "../../Inputs/TextArea/TextArea";
import Buttons from "../../Buttons/Buttons";
import { addHoldRequestComments } from "../../../common/redux/actions";

const Hold = (props) => {

    const modalData = props.modalData;
    const [data, setData] = useState({});
    const { brokerdetailId } = useParams();
    console.log("feedback modal:", modalData);
    const [commentValue, setCommentValue] = useState("");
  
    useEffect(() => {
        (async () => {
          if(brokerdetailId){
            try{                
                const res = await getBrokerDetails({brokerId: brokerdetailId})
                setData(res.data.resourceData);
            }
                catch(err){
                console.log(err);
            }
        }})();
      }, [brokerdetailId]);
      // const commentPosted = (comment) => {
      //   setAllComments([...allComments, comment])
      //   setCommentValue('')
    
        // addServiceRequestComments({ id: serviceRequestId, loginId: userData.userid, comments: commentValue })
        //   .then((response) => {
        //     if (response.data) {
        //       if (response.data.status === 200) _getServiceRequestDetailById();
        //       if (response.data.error) showErrorToast(response.data.error)
        //     }
        //     setLoading(false);
        //     console.log('response', response)
        //   })
        //   .catch((error) => {
        //     setLoading(false);
        //     console.log('error', error)
        //   })
        // }
    return (
        <>
        <Modal show={props.show} onHide={props.handleClose}className="mediumModal modal-dialog-centered" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body >
            <div>
                <h3>Reason For Holding</h3>

                <div className='commentInput'>
                    <TextArea
                      id="description"
                      label="Details"
                      rows="6"
                      placeholder="Enter Here..."
                      value={commentValue}
                      style={{ "maxHeight": "132px" }}
                      className="messagesModalWidth"
                      onChange={(e) => setCommentValue(e.target.value)}
                    
                    />
                   
                    <Buttons
                      name="Submit"
                      varient="primary"
                      type="submit"
                      size="Small"
                      color="white"
                      className="mt-3"
                      
                     
                    />
                  </div>
                
            </div>
          
          </Modal.Body> 
          </Modal>
        </>
    )
}
export default Hold