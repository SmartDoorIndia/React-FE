import React, { useState } from 'react'
import Text from '../../../../../shared/Text/Text'
import { Col, Row } from 'react-bootstrap'
import Buttons from "../../../../../shared/Buttons/Buttons";
import AddNewSubProject from '../../AddNewSubProject/AddNewSubProject';

const SubProjectDetails = (props) => {

    const [subProjectDetails, setSubProjectDetails] = useState(props?.subProjectDetails);
    const [editTowerFlag, setEditTowerFlag] = useState(false);
    const [editUnitFlag, setEditUnitFlag] = useState(false);

    return (
        <>
            <div>
                <Text text={'Unit Basic Specification'} style={{ fontSize: '18px', fontWeight: '700' }} />
                <Row>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Tower Name'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.towerName} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Rera Number'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.reraNumber} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Total Area to Develop'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.totalAreaToDevelop} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Total Floors'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.totalFloors} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Units per Floor'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.unitsPerFloor} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Contact Person Name'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.contactPersonName} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Contact Person Mobile Number'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.contactNumber} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Highlights / USP'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.highlightsUsp} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Separate Amenities'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Possession'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                </Row>
                <hr />
                <Text text={'Other Details'} style={{ fontSize: '18px', fontWeight: '700' }} />
                <Row>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Furnishing Type'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={9} className='mt-3' >
                        <Text text={'Furnishing Description'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Unit Entrance Facing & View'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={9} className='mt-3' >
                        <Text text={'Internal Amenities within The Unit'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className='mt-3' >
                        <Text text={'Property Description'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                </Row>
                <div style={{ justifySelf: 'end' }}>
                    <Buttons name="Edit Tower" varient="primary" onClick={() => { setEditTowerFlag(true) }} />
                </div>
                {editTowerFlag ?
                    <>
                        <AddNewSubProject />
                    </>
                    : null}
            </div>
            <hr />
            <div>
                <Text text={'Units Available'} style={{ fontSize: '18px', fontWeight: '700' }} />
                <Row className='mt-3'>
                    <Col>
                        <Text text={'Configuration'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col>
                        <Text text={'Total Units'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col>
                        <Text text={'Size '} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col>
                        <Text text={'Price Range'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col>
                        <Text text={'Comments'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                </Row>
                <div style={{ justifySelf: 'end' }}>
                    <Buttons name="Edit Unit" varient="primary" onClick={() => { setEditUnitFlag(true) }} />
                </div>
            </div>
        </>
    )
}

export default SubProjectDetails