import { Button, Col, Row } from "react-bootstrap";
import { compose } from "redux"
import Image from "../../../../shared/Image";
import Text from "../../../../shared/Text/Text";
import pencilIcon from '../../../../assets/svg/pencilIcon.svg';
import logoIcon from '../../../../assets/svg/logoIcon.svg';
import CorporateProperty from "../CorporateProperties/corporateProperty";

const CorporateDetails = () => {

    return (
        <>
            <div className="whiteBg">
                <Row>
                    <Col lg='3' className="text-center" style={{ borderInlineEnd: '2px dashed #DED6D9' }}>
                        <img src={logoIcon} alt='' style={{ height: '85px', width: '85px' }} />
                        <Text text='IFL Housing Finance Limited' fontWeight='bold' style={{ fontSize: '16px', }} />
                        <Text text='(Postings)' fontWeight='600' style={{ fontSize: '12px', color: '#8E878A' }} />
                        <Text text='Joined on: Aug 20, 2017' fontWeight='600' style={{ fontSize: '12px' }} />
                    </Col>
                    <Col lg='7'>
                        <Text text='Location Details' fontWeight='bold' style={{ fontSize: '16px', color: '#BE1452' }} />
                        <Text className='mt-3' text='Address' fontWeight='bold' style={{ fontSize: '14px', color: '#757575' }} />
                        <Text text='Office No. 002, , 28, Zenith Complex, KB Joshi Path, Sahakarnagar No - 2, Narveer Tanaji Wadi, Shivajinagar, Pune, Maharashtra 411005' 
                            fontWeight='700' style={{ fontSize: '14px' }} />
                    </Col>
                    <Col lg='2'>
                        <Button className="d-flex px-2" style={{ borderColor: '#BE1452', backgroundColor: '#FCDAE6', color: '#BE1452', borderRadius: '8', fontWeight: '500' }}>
                            <img className='p-0' src={pencilIcon} alt={''} style={{ width: '18px', height: '18px' }} />
                            Edit Details</Button>
                    </Col>
                </Row>
            </div>
            <CorporateProperty></CorporateProperty>
        </>
    )
}

export default compose(CorporateDetails);