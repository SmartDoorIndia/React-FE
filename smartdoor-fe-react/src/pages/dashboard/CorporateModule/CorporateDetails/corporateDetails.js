import { Button, Col, Row } from "react-bootstrap";
import { compose } from "redux"
import Image from "../../../../shared/Image";
import Text from "../../../../shared/Text/Text";
import pencilIcon from '../../../../assets/svg/pencilIcon.svg';
import logoIcon from '../../../../assets/svg/logoIcon.svg';
import CorporateProperty from "../CorporateProperties/corporateProperty";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { getCorporateById } from "../../../../common/redux/actions";
import { connect } from "react-redux";
import { formateDate } from "../../../../common/helpers/Utils";

const CorporateDetails = (props) => {

    const corporateId = props?.location?.state?.corporateId;
    const [corporateDetails, setCorporateDetails] = useState({});

    const history = useHistory();

    const getCorprateDetails = async () => {
        await getCorporateById({
            corporateId: corporateId,
            pageNo: 1,
            pageSize: 8
        }).then(response => {
            console.log(response)
            setCorporateDetails(response?.data?.resourceData[0])
        }) ;
    }
    useEffect(() => {
        console.log(props);
        getCorprateDetails();
    }, []);

    return (
        <>
            <div className="whiteBg">
                <Row>
                    <Col lg='3' className="text-center" style={{ borderInlineEnd: '2px dashed #DED6D9' }}>
                        <img src={corporateDetails.logo || logoIcon} alt='' style={{ height: '85px', width: '85px' }} />
                        <Text text={corporateDetails?.companyName} fontWeight='bold' style={{ fontSize: '16px', }} />
                        <Text text={'( ' + corporateDetails.totalPostingCount + ' Postings ) '} fontWeight='600' style={{ fontSize: '12px', color: '#8E878A' }} />
                        <Text text={'Joined on: ' + formateDate(corporateDetails?.joiningDate)} fontWeight='600' style={{ fontSize: '12px' }} />
                    </Col>
                    <Col lg='7'>
                        <Text text='Location Details' fontWeight='bold' style={{ fontSize: '16px', color: '#BE1452' }} />
                        <Text className='mt-3' text='Address' fontWeight='bold' style={{ fontSize: '14px', color: '#757575' }} />
                        <Text text={corporateDetails?.companyAddress} 
                            fontWeight='700' style={{ fontSize: '14px' }} />
                    </Col>
                    <Col lg='2'>
                        <Button className="d-flex px-2" style={{ borderColor: '#BE1452', backgroundColor: '#FCDAE6', color: '#BE1452', borderRadius: '8', fontWeight: '500' }}
                            onClick={() => {history.push('/admin/corporate/addNewCorporate', {corporateId: corporateId});}} >
                            <img className='p-0' src={pencilIcon} alt={''} style={{ width: '18px', height: '18px' }} />
                            Edit Details</Button>
                    </Col>
                </Row>
            </div>
            <CorporateProperty corporateId={corporateId} ></CorporateProperty>
        </>
    )
}

const mapStateToProps = ({}) => ({});

const actions = {
    getCorporateById
}

export default compose(connect(mapStateToProps, actions))(CorporateDetails);