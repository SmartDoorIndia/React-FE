import react, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Buttons from '../../../../shared/Buttons/Buttons';
import Text from '../../../../shared/Text/Text';
import Image from '../../../../shared/Image/Image';
import MapComponent from '../../../../shared/Map/MapComponent';
import { Col, Row } from 'react-bootstrap';
import Camera from '../../../../assets/images/camra-icon.svg';
import Delete from '../../../../assets/images/delete-icon.svg';
import './BuilderProperty.scss';

class Building extends Component {
  constructor(props) {
    super(props);

    console.log('this.props:', this.props);

    this.state = {
      'bhkNumArr': [ 1, 2, 3, 4, 5 ],
      'addCommercialBuildingRequest': [],
      'area': '',
      'commercialavailableUnits': '',
      'commercialcarpetArea': '',
      'categoryType': '',
      'commercialmaximumPrice': '',
      'commercialminimumPrice': '',
      'commercialtotalUnits': '',
      'type': '',

      'buildingTypeResidential': true,
      'buildingTypeCommercial': false,
      'AddNewResidentialEntry': [ { id: 1 } ],
      'AddNewCommEntry': [ { id: 1 } ],
      'commercialCategoryTypeShop': false,
      'commercialCategoryTypeRestaurant': false,
      'commercialCategoryTypeOffice': false,
      'commercialTypeWarmshell': false,
      'commercialTypeBareshell': false,
      'commercialTypeFurnished': false,
      'commercialAreaHighstreet': false,
      'commercialAreaMall': false,
      'commercialAreaComplex': false,
      'commercialAreaStandAlone': false,

      'id': '',
      'addResidentialBuildingRequest': [
        {
          'id': 0,
          'residentialavailableUnits': '',
          'residentialbuildingBhk': '',
          'residentialcarpetArea': '',
          'residentialmaximumPrice': '',
          'residentialminimumPrice': '',
          'residentialtotalUnits': '' },
      ],

      'addProjectBuildingRequest': this.props.addProjectBuildingReq,
    }
  }

  render() {
    const { BuildingcVal, indx } = this.props;
    const { commercialavailableUnits, commercialcarpetArea,
      commercialmaximumPrice, commercialminimumPrice, residentialavailableUnits,
      residentialcarpetArea, residentialmaximumPrice, residentialminimumPrice, residentialtotalUnits,
      buildingTypeResidential, buildingTypeCommercial, AddNewResidentialEntry, AddNewCommEntry,
      addResidentialBuildingRequest, floors, addProjectBuildingRequest, commercialCategoryTypeShop,
      commercialCategoryTypeRestaurant,
      commercialCategoryTypeOffice,
      commercialTypeWarmshell,
      commercialTypeBareshell,
      commercialTypeFurnished,
      commercialAreaHighstreet,
      commercialAreaMall,
      commercialAreaComplex,
      commercialAreaStandAlone,
    } =this.state;

    return (
      <>

        <div className="lightBg mt-4 mb-4">
          <Text size="regular" fontWeight="mediumbold" color="secondryColor" text={ `Building/Tower${ indx+1 }` } />
          <div className="lableField">
            <Row>
              <Col lg={ 6 } md={ 6 }>
                <div className="d-flex mt-4 customChechbox">
                  <div className="checkBox">
                    {/* <Form.Group controlId="formBasicCheckbox1"> */}
                    <Form.Group controlId={ `chkbxResidential${ indx }` }>
                      <Form.Check type="checkbox" label="Residential" className="p-0"
                        checked ={ buildingTypeResidential }
                        onChange={ (e) => {
                          this.setState({ buildingTypeResidential: !buildingTypeResidential })
                          this.props.buildingTypeResidential(BuildingcVal.id, !buildingTypeResidential)
                        } }
                      />
                    </Form.Group>
                  </div>
                  <div className="checkBox">
                    {/* <Form.Group controlId="formBasicCheckbox"> */}
                    <Form.Group controlId={ `chkbxCommercial${ indx }` }>
                      <Form.Check type="checkbox" label="Commercial" className="p-0"
                        checked ={ buildingTypeCommercial }
                        onChange={ (e) => {
                          this.setState({ buildingTypeCommercial: !buildingTypeCommercial })
                          this.props.buildingTypeCommercial(BuildingcVal.id, !buildingTypeCommercial)
                        } }
                      />
                    </Form.Group>
                  </div>
                </div>
              </Col>
              <Col lg={ 6 } md={ 6 }>
                <Form.Group controlId="formBasicContact">
                  <Form.Label>Name of the Tower </Form.Label>
                  <Form.Control type="text" placeholder="Name of the Tower " maxlength="35"
                    name = "towerName"
                    value ={ BuildingcVal.towerName }
                    onChange= { (evnt)=>this.props.handleDataChange(evnt, indx, BuildingcVal[ indx ]) }
                  />
                  <Text color="dangerText" size="xSmall" text={ this.props.error[ `towerName${ indx }` ] } />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={ 6 } md={ 6 }>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Phase </Form.Label>
                  <Form.Control as="select"
                    name = "phase"
                    value ={ BuildingcVal.phase }
                    onChange= { (evnt)=>this.props.handleDataChange(evnt, indx, BuildingcVal[ indx ]) }
                  >
                    <option value="">Select </option>
                    {this.props.numArr.map((cVal, ind)=>{
                      return <option value={ cVal }>{cVal}</option>
                    })}
                  </Form.Control>
                  <Text color="dangerText" size="xSmall" text={ this.props.error[ `phase${ indx }` ] } />
                </Form.Group>
              </Col>
              <Col lg={ 6 } md={ 6 }>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Floors  </Form.Label>
                  <Form.Control as="select"
                    name = "floors"
                    value ={ BuildingcVal.floors }
                    onChange= { (evnt)=>this.props.handleDataChange(evnt, indx, BuildingcVal[ indx ]) }
                  >
                    <option value="">Select</option>
                    {this.props.numArr.map((cVal, ind)=>{
                      return <option value={ cVal }>{cVal}</option>
                    })}
                  </Form.Control>
                  <Text color="dangerText" size="xSmall" text={ this.props.error[ `floors${ indx }` ] } />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={ 6 } md={ 6 }>
                <Form.Group controlId="formBasicContact">
                  <Form.Label>Start Date </Form.Label>
                  <Form.Control type="date" placeholder="Start Date" maxlength="35"
                    name = "startDate"
                    value ={ BuildingcVal.startDate }
                    onChange= { (evnt)=>this.props.handleDataChange(evnt, indx, BuildingcVal[ indx ]) }
                  />
                  <Text color="dangerText" size="xSmall" text={ this.props.error[ `startDate${ indx }` ] } />
                </Form.Group>
              </Col>
              <Col lg={ 6 } md={ 6 }>
                <Form.Group controlId="formBasicContact">
                  <Form.Label>Proposed Completion</Form.Label>
                  <Form.Control type="date" placeholder="Proposed Completion" maxlength="35"
                    name = "proposedCompletion"
                    value ={ BuildingcVal.proposedCompletion }
                    onChange= { (evnt)=>this.props.handleDataChange(evnt, indx, BuildingcVal[ indx ]) }
                  />
                  <Text color="dangerText" size="xSmall" text={ this.props.error[ `proposedCompletion${ indx }` ] } />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={ 6 } md={ 6 }>
                <Form.Group controlId="formBasicContact">
                  <Form.Label>Revised Date </Form.Label>
                  <Form.Control type="date" placeholder="Revised Date" maxlength="35"
                    // revisedDate
                    name = "revisedDate"
                    value ={ BuildingcVal.revisedDate }
                    onChange= { (evnt)=>this.props.handleDataChange(evnt, indx, BuildingcVal[ indx ]) }
                  />
                  <Text color="dangerText" size="xSmall" text={ this.props.error[ `revisedDate${ indx }` ] } />
                </Form.Group>
              </Col>
              <Col lg={ 6 } md={ 6 }>
                <Form.Group controlId="formBasicContact">
                  <Form.Label>Possession Date </Form.Label>
                  <Form.Control type="date" placeholder="Possession Date " maxlength="35"
                    // possessionDate
                    name = "possessionDate"
                    value ={ BuildingcVal.possessionDate }
                    onChange= { (evnt)=>this.props.handleDataChange(evnt, indx, BuildingcVal[ indx ]) }
                  />
                  <Text color="dangerText" size="xSmall" text={ this.props.error[ `possessionDate${ indx }` ] } />
                </Form.Group>
              </Col>
            </Row>
          </div>

          {buildingTypeResidential?
            <div className="builderForm bg-white mt-3 residentialBox mb-3 boxSpace">
              <div className="border-bottom pb-2 mb-3">
                <Text size="regular" fontWeight="semibold" color="secondryColor" text="Residential" />
              </div>

              {BuildingcVal.addResidentialBuildingRequest.length ? BuildingcVal.addResidentialBuildingRequest.map((cVal, ind)=>{
                return <Row key = { cVal.id } className="d-flex justify-content-center align-items-center lableTitle">
                  <Col>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Label>BHK</Form.Label>
                      <Form.Control as="select"
                        name = "buildingBhk"
                        value ={ cVal.buildingBhk }
                        onChange= { (evnt)=>this.props.handleResiDataChange(evnt, BuildingcVal.id, cVal.id, ind, cVal[ ind ]) }
                      >
                        <option value="">Select</option>
                        {this.state.bhkNumArr.map((cVal, ind)=>{
                          return <option value={ cVal }>{cVal}</option>
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicContact">
                      <Form.Label>Carpet Area</Form.Label>
                      <Form.Control type="text" placeholder="Carpet Area" maxlength="35"
                        name = "carpetArea"
                        value ={ cVal.carpetArea }
                        onChange= { (evnt)=>this.props.handleResiDataChange(evnt, BuildingcVal.id, cVal.id, ind, cVal[ ind ]) }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicContact">
                      <Form.Label>Total Units</Form.Label>
                      <Form.Control type="text" placeholder="Total Units" maxlength="35"
                        name = "totalUnits"
                        value ={ cVal.totalUnits }
                        onChange= { (evnt)=>this.props.handleResiDataChange(evnt, BuildingcVal.id, cVal.id, ind, cVal[ ind ]) }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicContact">
                      <Form.Label>Available Units</Form.Label>
                      <Form.Control type="text" placeholder="Available Units" maxlength="35"
                        name = "availableUnits"
                        value ={ cVal.availableUnits }
                        onChange= { (evnt)=>this.props.handleResiDataChange(evnt, BuildingcVal.id, cVal.id, ind, cVal[ ind ]) }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicContact">
                      <Form.Label>Price  Min</Form.Label>
                      <Form.Control type="text" placeholder="Price Min" maxlength="35"
                        name = "minimumPrice"
                        value ={ cVal.minimumPrice }
                        onChange= { (evnt)=>this.props.handleResiDataChange(evnt, BuildingcVal.id, cVal.id, ind, cVal[ ind ]) }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicContact">
                      <Form.Label>Price Max</Form.Label>
                      <Form.Control type="text" placeholder="Price Max" maxlength="35"
                        name = "maximumPrice"
                        value ={ cVal.maximumPrice }
                        onChange= { (evnt)=>this.props.handleResiDataChange(evnt, BuildingcVal.id, cVal.id, ind, cVal[ ind ]) }
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col>
                                    <Form.Group controlId="formBasicContact">
                                        <Form.Label>Floor Plan</Form.Label>
                                        <Form.Control type="text" placeholder="Floor Plan" maxlength="35"
                                         onChange={(e) => e.target.value }
                                        />
                                    </Form.Group>
                                </Col> */}
                  <div className="deleteIcon">
                    <div className="deleteButton"
                      onClick = { ()=>this.props.handleDeleteResidentialEntry(BuildingcVal.id, cVal.id) }>
                      <Image name="consumerIcon" src={ Delete } />
                    </div>
                  </div>

                </Row>
              }):<Text text="Add new entry" size="regular" fontWeight="semibold" color="secondryColor"/> }

              <div className="formButton">
                <Buttons name="Add New Entry" varient="success" type="submit" size="Small" color="white"
                  onClick= { (evnt)=>this.props.handleAddNewEntry(evnt, BuildingcVal.id) }
                />

              </div>
            </div>:null}

          {buildingTypeCommercial?
            <div className="builderForm bg-white mt-3 residentialBox mb-3">
              <div className="border-bottom pb-2 mb-3">
                <Text size="regular" fontWeight="semibold" color="secondryColor" text="Commercial " />
              </div>

              {BuildingcVal.addCommercialBuildingRequest.length?BuildingcVal.addCommercialBuildingRequest.map((cVal, ind)=>{
                const randomId = Math.random();
                return (<>
                  <Row>
                    <Col lg={ 6 } md={ 6 }>
                      <div className="d-flex mt-4 customChechbox">
                        <div className="checkBox">
                          <Form.Group controlId={ `Shop${ randomId }` }>
                            <Form.Check type="radio" label="Shop" className="p-0"
                              name = { 'categoryType'+randomId }
                              typename="categoryType"
                              value = "Shop"
                              //  onChange={(e) => console.log("123123",e.target.value)}
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'categoryType') }
                            />
                          </Form.Group>
                        </div>
                        <div className="checkBox">
                          <Form.Group controlId={ `Restaurant${ randomId }` }>
                            <Form.Check type="radio" label="Restaurant" className="p-0"
                              name = { 'categoryType'+randomId }
                              typename="categoryType"
                              value = "Restaurant"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'categoryType') }
                            />
                          </Form.Group>
                        </div>
                        <div className="checkBox">
                          <Form.Group controlId={ `Office${ randomId }` }>
                            <Form.Check type="radio" label="Office" className="p-0"
                              name = { 'categoryType'+randomId }
                              typename="categoryType"
                              value = "Office"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'categoryType') }
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="boxSpace">
                    <Col lg={ 6 } md={ 6 }>
                      <Text size="Small" fontWeight="semibold" color="secondryColor" text="Area " className="mt-3 pb-1" />
                      <div className="d-flex  customChechbox">
                        <div className="checkBox">
                          <Form.Group controlId={ `highstreet${ randomId+10 }` }>
                            <Form.Check type="radio" label="High Street" className="p-0"
                              name = { 'area'+randomId+10 }
                              typename="area"
                              value = "highstreet"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'area') }
                            />
                          </Form.Group>
                        </div>
                        <div className="checkBox">
                          <Form.Group controlId={ `mall${ randomId+10 }` }>
                            <Form.Check type="radio" label="Mall" className="p-0"
                              name = { 'area'+randomId+10 }
                              typename="area"
                              value = "mall"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'area') }
                            />
                          </Form.Group>
                        </div>
                        <div className="checkBox">
                          <Form.Group controlId={ `complex${ randomId+10 }` }>
                            <Form.Check type="radio" label="Complex" className="p-0"
                              name = { 'area'+randomId+10 }
                              typename="area"
                              value = "complex"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'area') }
                            />
                          </Form.Group>
                        </div>
                        <div className="checkBox">
                          <Form.Group controlId={ `standalone${ randomId+10 }` }>
                            <Form.Check type="radio" label="Standalone" className="p-0"
                              name = { 'area'+randomId+10 }
                              typename="area"
                              value = "standalone"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'area') }
                            />

                          </Form.Group>
                        </div>
                      </div>
                    </Col>
                    <Col lg={ 6 } md={ 6 }>
                      <Text size="Small" fontWeight="semibold" color="secondryColor" text="Type " className="mt-3 pb-1" />
                      <div className="d-flex  customChechbox">
                        <div className="checkBox">
                          <Form.Group controlId={ `warmshell${ randomId+20 }` }>
                            <Form.Check type="radio" label="Warm shell" className="p-0"
                              name = { 'type'+randomId+20 }
                              typename="type"
                              value = "warmshell"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'type') }
                            />
                          </Form.Group>
                        </div>
                        <div className="checkBox">
                          <Form.Group controlId={ `bareshell${ randomId+20 }` }>
                            <Form.Check type="radio" label="Bare shell" className="p-0"
                              name = { 'type'+randomId+20 }
                              typename="type"
                              value = "bareshell"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'type') }
                            />
                          </Form.Group>
                        </div>
                        <div className="checkBox">
                          <Form.Group controlId={ `furnished${ randomId+20 }` }>
                            <Form.Check type="radio" label="Furnished" className="p-0"
                              name = { 'type'+randomId+20 }
                              typename="type"
                              value = "furnished"
                              onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'type') }
                            />
                          </Form.Group>
                        </div>

                      </div>
                    </Col>
                  </Row>

                  <Row className="d-flex justify-content-center align-items-center boxSpace">

                    <Col>
                      <Form.Group controlId="formBasicContact">
                        <Form.Label>Carpet Area</Form.Label>
                        <Form.Control type="text" placeholder="Carpet Area" maxlength="35"
                          name = "carpetArea"
                          typename="carpetArea"
                          value ={ cVal.carpetArea }
                          onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'carpetArea') }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicContact">
                        <Form.Label>Total Units</Form.Label>
                        <Form.Control type="text" placeholder="Total Units" maxlength="35"
                          name = "totalUnits"
                          typename="totalUnits"
                          value ={ cVal.totalUnits }
                          onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'totalUnits') }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicContact">
                        <Form.Label>Available Units</Form.Label>
                        <Form.Control type="text" placeholder="Available Units" maxlength="35"
                          name = "availableUnits"
                          typename="availableUnits"
                          value ={ cVal.availableUnits }
                          onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'availableUnits') }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicContact">
                        <Form.Label>Price  Min</Form.Label>
                        <Form.Control type="text" placeholder="Price  Min" maxlength="35"
                          name = "minimumPrice"
                          typename="minimumPrice"
                          value ={ cVal.minimumPrice }
                          onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'minimumPrice') }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicContact">
                        <Form.Label>Price Max</Form.Label>
                        <Form.Control type="text" placeholder="Price Max" maxlength="35"
                          name = "maximumPrice"
                          typename="maximumPrice"
                          value ={ cVal.maximumPrice }
                          onChange= { (evnt)=>this.props.handleCommDataChange(evnt.target.value, BuildingcVal.id, cVal.id, 'maximumPrice') }
                        />
                      </Form.Group>
                    </Col>
                    {/* <Col>
                                                <Form.Group controlId="formBasicContact">
                                                    <Form.Label>Floor Plan</Form.Label>
                                                    <Form.Control type="text" placeholder="Floor Plan" maxlength="35"
                                                    // onChange={(e) => e.target.value }
                                                    />
                                                </Form.Group>
                                            </Col> */}
                    <div className="deleteIcon">
                      <div className="deleteButton"
                        onClick = { ()=>this.props.handleDeleteCommEntry(BuildingcVal.id, cVal.id) }>
                        <Image name="consumerIcon" src={ Delete } />
                      </div>

                    </div>
                  </Row>
                </>
                )
              }):<Text text="Add new entry" size="regular" fontWeight="semibold" color="secondryColor"/> }

              <div className="formButton">
                <Buttons name="Add New Entry" varient="success" type="submit" size="Small" color="white"
                  onClick={ (evnt)=>this.props.handleAddNewCommEntry(evnt, BuildingcVal.id) }
                />

              </div>
            </div>:null}
        </div>

      </>
    )
  }
}

export default Building;
