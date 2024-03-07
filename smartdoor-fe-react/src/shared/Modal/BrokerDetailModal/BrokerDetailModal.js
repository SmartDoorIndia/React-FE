import  React,{useState,useEffect} from "react";
import {Modal, Row, Col} from 'react-bootstrap';
import { getBrokerDetails } from '../../../common/redux/actions';
import { useParams } from "react-router-dom";

const Hold = (props) => {

    const modalData = props.modalData;
    const [data, setData] = useState({});
    const { brokerdetailId } = useParams();
    console.log("feedback modal:", modalData);
  
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
    return (
        <>
        <Modal show={props.show} onHide={props.handleClose}className="mediumModal modal-dialog-centered" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body >
            <div>
                <h3>Reason For Holding</h3>
                
            </div>
          
          </Modal.Body> 
          </Modal>
        </>
    )
}
export default Hold