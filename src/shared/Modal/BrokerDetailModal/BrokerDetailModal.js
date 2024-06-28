import  React,{useState,useEffect} from "react";
import {Modal} from 'react-bootstrap';
import { getBrokerDetails,addHoldRequestComments } from '../../../common/redux/actions';
import { useParams } from "react-router-dom";
import TextArea from "../../Inputs/TextArea/TextArea";
import Buttons from "../../Buttons/Buttons";
const Hold = (props) => {

    // const modalData = props.modalData;
    const [data, setData] = useState({});
    const { brokerdetailId } = useParams();
    // const history = useHistory();
    // const [allComments, setAllComments] = useState([])
    const [commentValue, setCommentValue] = useState("");
    // const [loading, setLoading] = useState(true);
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
      const commentPosted = async (comment) => {
      
          await addHoldRequestComments({
            brokerId: Number(brokerdetailId),
            brokerStatus: !props.holdStatus ? "ON_HOLD" : "UN_HOLD",
            holdReason: comment
         });
         setTimeout(() => {
          props.handleClose();
      }, 1000);
     
         props.toggleHoldStatus();
        }
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
                      disabled={commentValue.trim()==="" ? true : false}
                      onClick={() => commentPosted(commentValue.trim())}
        
                    />
                  </div>
                
            </div>
          
          </Modal.Body> 
          </Modal>
        </>
    )
}
export default Hold