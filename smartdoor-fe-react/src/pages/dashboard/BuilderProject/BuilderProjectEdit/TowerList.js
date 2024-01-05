
import { memo } from 'react';
import { Col, Row } from "react-bootstrap";

import Text from '../../../../shared/Text/Text';
import Buttons from '../../../../shared/Buttons/Buttons';
import Input, { CheckBox } from '../../../../shared/Inputs/Input/Input';

const TowerList  = ({

}) => {
	return (
		<div className="lightBg mt-4 mb-4">
            <Text size="regular" fontWeight="mediumbold" color="secondryColor" text={ `Building/Tower${ 1 }` } />

            <div className="lableField">

                <Row>
                  <Col lg={ 6 } md={ 6 }>
                    <div className="d-flex mt-4 pt-2 pb-1 pr-1">
                        <CheckBox id="chkbxResidential" label="Residential" />
                        <CheckBox id="chkbxCommercial" label="Commercial" />
                    </div>
                  </Col>

                  <Col lg={ 6 } md={ 6 }>
                    <Input 
                        label="Name of the Tower" 
                        type="text"
                        placeholder="Enter Tower Name" 
                        maxLength="35"
                    />              
                  </Col>
                </Row>

                <Row>
                  <Col lg={ 6 } md={ 6 }>
                    <Input 
                        label="Number Of Open Parkings In Building" 
                        type="number"
                        placeholder="Enter Number of Open Parkings" 
                    />              
                  </Col>
                  <Col lg={ 6 } md={ 6 }>
                    <Input 
                        label="Number Of Closed Parkings In Building" 
                        type="number"
                        placeholder="Enter Number Of Closed Parkings" 
                    />              
                  </Col>
                </Row>

                <Row>
                  <Col lg={ 6 } md={ 6 }>
                    <Input 
                        label="Number Of Apartments" 
                        type="number"
                        placeholder="Enter Number Of Apartments" 
                    />              
                  </Col>
                  <Col lg={ 6 } md={ 6 }>
                    <Input 
                        label="Completion Status" 
                        type="text"
                        placeholder="Enter Completion Status" 
                        maxLength={20}
                    />              
                  </Col>
                </Row>
            </div>

            <div className="builderForm bg-white mt-3 residentialBox boxSpace">
                <div className="border-bottom pb-2">
                    <Text size="regular" fontWeight="semibold" color="secondryColor" text="Residential" />
                </div>

                <Row  className="d-flex justify-content-center align-items-center lableTitle pr-3 pl-3">
                    <div className="p-0 bhk-select">
                        <Input
                          label="BHK"
                          as="select"
                          placeholder="BHK"
                        >
                            <option value="">1</option>
                            <option value="">2</option>
                        </Input>              
                    </div>
                    <Col lg={2} className="p-0">
                        <Input
                          label="Carpet Area"
                          type="number"
                          placeholder="Enter Carpet Area" />
                    </Col>
                    <Col className="p-0">
                      <Input
                          label="Total Units"
                          type="number"
                          placeholder="Enter Total Units" />
                    </Col>
                    <Col className="p-0 label-field">  
                      <Input
                          label="Available Units"
                          type="number"
                          placeholder="Enter Available Units" />
                    </Col>
                    <Col lg={2} className="p-0">
                      <Input
                          label="Price Min"
                          type="number"
                          // leadingIcon="&#8377;"
                          placeholder="Enter Price Min" />
                    </Col>
                    <Col lg={2} className="p-0">
                      <Input
                          label="Price Max"
                          type="number"
                          // leadingIcon="&#8377;"
                          placeholder="Enter Price Max" />

                    </Col>
                    <Col className="pl-0">
                      <Input
                          label="Floor Plan"
                          type="component"
                          disabled
                          className="background-transparent"
                          component={
                              <Text 
                                  text="Upload" 
                                  color="primaryColor" 
                                  fontWeight="bold" 
                                  size="Small" 
                                  className="text-decoration-underline d-flex justify-content-center" />}
                           >
                        </Input>

                    </Col>
                </Row>
                <div className="formButton">
                    <Buttons name="Save" varient="primary" size="Small" color="white" />
                </div>

            </div>       

            <div className="builderForm bg-white mt-3 residentialBox boxSpace">
              <div className="border-bottom pb-2 mb-3">
                <Text size="regular" fontWeight="semibold" color="secondryColor" text="Commercial " />
              </div>

                <div className="border-bottom">

                  <Row>
                    <Col lg={ 6 } md={ 6 }>
                      <div className="d-flex customChechbox">
                        <CheckBox id="chkbxCommercialShop" label="Shop" />
                        <CheckBox id="chkbxCommercialOffice" label="Office" />
                      </div>
                    </Col>
                  </Row>
                  
                  <Row className="boxSpace">
                    <Col lg={ 6 } md={ 6 } className="pr-0">
                      <Text size="Small" fontWeight="bold" color="secondryColor" text="Area " className="mt-3 pb-1" />

                      <div className="d-flex customChechbox check-row">

                        <CheckBox id="chkbxCommercialShop" label="High Street" />
                        <CheckBox id="chkbxCommercialShop" label="Complex" />
                        <CheckBox id="chkbxCommercialShop" label="Standalone" />

{/*                        <div className="checkBox">
                          <Form.Group controlId={ `highstreet${ 10 }` }>
                            <Form.Check type="radio" label="High Street" className="p-0"
                              name = { 'area'+10 }
                              typename="area"
                              value = "highstreet"
                            />
                          </Form.Group>
                        </div>*/}
                      </div>
                    </Col>

                    <Col lg={ 6 } md={ 6 } className="pr-0">
                      <Text size="Small" fontWeight="bold" color="secondryColor" text="Type " className="mt-3 pb-1" />
                      <div className="d-flex customChechbox check-row">
                        <CheckBox id="chkbxCommercialShop" label="Warm shell" />
                        <CheckBox id="chkbxCommercialShop" label="Bare shell" />
                        <CheckBox id="chkbxCommercialShop" label="Furnished" />
                      </div>
                    </Col>
                  </Row>

                <Row  className="d-flex justify-content-center align-items-center lableTitle pr-3 pl-3 mb-3">
                    <Col className="p-0">
                      <Input
                          label="Carpet Area"
                          type="number"
                          placeholder="Enter Carpet Area" />
                    </Col>
                    <Col className="p-0">
                      <Input
                          label="Total Units"
                          type="number"
                          placeholder="Enter Total Units" />
                    </Col>
                    <Col className="p-0">
                      <Input
                          label="Available Units"
                          type="number"
                          placeholder="Enter Available Units" />
                    </Col>
                    <Col  className="p-0">
                      <Input
                          label="Price Min"
                          type="number"
                          placeholder="Enter Price  Min" />
                    </Col>
                    <Col className="p-0">
                      <Input
                          label="Price Max"
                          type="number"
                          placeholder="Enter Price Max" />
                    </Col>

                    <Col className="pl-0 pr-0"  lg={2}>
                      <Input
                          label="Floor Plan"
                          type="component"
                          disabled
                          className="background-transparent"
                          component={
                              <Text 
                                  text="View" 
                                  color="primaryColor" 
                                  fontWeight="bold" 
                                  size="Small" 
                                  className="d-flex justify-content-center" />}
                           >
                        </Input>
                    </Col>
                  </Row>
                </div>

                <div className="formButton">
                    <Buttons name="Save" varient="primary" size="Small" color="white" />
                </div>


            </div>


        </div>                    
		);
}

export default memo(TowerList);