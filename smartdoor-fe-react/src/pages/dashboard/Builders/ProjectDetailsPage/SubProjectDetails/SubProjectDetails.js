/** @format */

import React, { useState } from "react";
import Text from "../../../../../shared/Text/Text";
import { Button, Col, Row } from "react-bootstrap";
import Buttons from "../../../../../shared/Buttons/Buttons";
import AddNewSubProject from "../../AddNewSubProject/AddNewSubProject";
import { formateDate, setPrice, showErrorToast } from "../../../../../common/helpers/Utils";
import Units from "../../AddNewSubProject/AddNewUnit/Units";
import Image from "../../../../../shared/Image/Image";
import addIcon from "../../../../../assets/svg/add.svg";

const SubProjectDetails = (props) => {
   const [subProjectDetails, setSubProjectDetails] = useState(props?.subProjectDetails);
   const [editTowerFlag, setEditTowerFlag] = useState(false);
   const [editUnitFlag, setEditUnitFlag] = useState(false);
   const [showMoreUnits, setShowMoreUnits] = useState(false);
   const [editPropertyId, setEditPropertyId] = useState(null);

   const updateSubProjectEdit = (subProject) => {
      setEditTowerFlag(false);
      setSubProjectDetails(subProject);
   };

   const toggleEditTowerFlag = () => {
      setEditTowerFlag(false);
   };

   const handleFetchUnit = (unitDetails) => {
      console.log("", unitDetails);
      let units = [...subProjectDetails?.properties];
      if (editUnitFlag) {
         units = units.map((unit) => (unit.propertyId === editPropertyId ? unitDetails : unit));
      } else {
         units.push(unitDetails);
      }
      setSubProjectDetails((prevData) => ({ ...prevData, properties: [...units] }));
      setShowMoreUnits(false);
      setEditUnitFlag(false);
      setEditPropertyId(null);
   };

   const handleRemoveUnit = () => {
      setEditUnitFlag(false);
      setShowMoreUnits(false);
   };

   const handleAddMoreUnit = () => {
      // const newUnit = {
      //     builderId: props?.builderId,
      //     projectId: subProjectDetails.projectId,
      // };
      // let units = [];
      // units = subProjectDetails.properties;
      // units.push(newUnit);
      // setSubProjectDetails((prevState) => ({
      //     ...prevState,
      //     properties: units
      // }));
   };

   const closeTab = () => {
      setShowMoreUnits(false);
   };

   return (
      <>
         <div>
            <Text
               text={"Tower Basic Specification"}
               style={{ fontSize: "18px", fontWeight: "700" }}
            />
            <Row>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Tower Name"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={subProjectDetails?.projectName}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Rera Number"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={subProjectDetails?.reraNumber}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Total Area to Develop"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={(subProjectDetails?.totalAreaToDevelop || "0") + " Sq. Ft."}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Total Floors"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={subProjectDetails?.totalFloors || "0"}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Units per Floor"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={subProjectDetails?.unitsPerFloor || "0"}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Contact Person Name"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={subProjectDetails?.contactName}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Contact Person Mobile Number"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={subProjectDetails?.contactNumber}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Highlights / USP"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={subProjectDetails?.highlights || "N/A"}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Separate Amenities"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={subProjectDetails?.amenities?.join(", ")}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
               <Col lg={3} className="mt-3">
                  <Text
                     text={"Possession"}
                     style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                  />
                  <Text
                     text={
                        formateDate(subProjectDetails?.possessionFrom, "MMM, YYYY") +
                        "-" +
                        formateDate(subProjectDetails?.possessionTo, "MMM, YYYY")
                     }
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </Col>
            </Row>
            <hr />
            {/* <Text text={'Other Details'} style={{ fontSize: '18px', fontWeight: '700' }} />
                <Row>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Furnishing Type'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={9} className='mt-3' >
                        <Text text={'Furnishing Description'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                </Row> */}
            {/* <Row>
                    <Col lg={3} className='mt-3' >
                        <Text text={'Unit Entrance Facing & View'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                    <Col lg={9} className='mt-3' >
                        <Text text={'Internal Amenities within The Unit'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.projectAmenities} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                </Row> */}
            {/* <Row>
                    <Col lg={12} className='mt-3' >
                        <Text text={'Property Description'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                        <Text text={subProjectDetails?.projectDescription || 'N/A'} style={{ fontSize: '14px', fontWeight: '500' }} />
                    </Col>
                </Row> */}
            <div style={{ justifySelf: "end" }}>
               <Buttons
                  name="Edit Tower"
                  disabled={
                     props?.projectStatus === "UNDER_REVIEW" ||
                     props?.projectStatus === "REJECTED" ||
                     props?.projectStatus === "ON_HOLD"
                        ? true
                        : false
                  }
                  varient="primary"
                  onClick={() => {
                     setEditTowerFlag(true);
                  }}
               />
            </div>
            {editTowerFlag ? (
               <>
                  <AddNewSubProject
                     subProjectDetails={subProjectDetails}
                     editTower={true}
                     parentProjectId={props?.parentProjectId}
                     builderId={props?.builderId}
                     updateSubProject={updateSubProjectEdit}
                     toggleEditTower={toggleEditTowerFlag}
                  />
               </>
            ) : null}
         </div>
         <hr />
         <div>
            <Text text={"Units Available"} style={{ fontSize: "18px", fontWeight: "700" }} />
            {subProjectDetails?.properties?.map((property) => (
               <>
                  <Row className="mt-3">
                     <Col>
                        <Text
                           text={"Configuration"}
                           style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                        />
                        <Text
                           text={
                              property?.propertySubType +
                              " - " +
                              (property?.compositionType?.trim() || "N/A")
                           }
                           style={{ fontSize: "14px", fontWeight: "500" }}
                        />
                     </Col>
                     <Col>
                        <Text
                           text={"Total Units"}
                           style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                        />
                        <Text
                           text={property?.totalUnits}
                           style={{ fontSize: "14px", fontWeight: "500" }}
                        />
                     </Col>
                     {property?.propertySubType === "Plot" ? (
                        <>
                           <Col>
                              <Text
                                 text={"Plot Size"}
                                 style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                              />
                              <Text
                                 text={
                                    (property?.minArea || "0") +
                                    "Sq.Ft." +
                                    " - " +
                                    (property?.maxArea || "0") +
                                    "Sq.Ft."
                                 }
                                 style={{ fontSize: "14px", fontWeight: "500" }}
                              />
                           </Col>
                        </>
                     ) : (
                        <Col>
                           <Text
                              text={"Size "}
                              style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                           />
                           <Text
                              text={
                                 (property?.minArea || "0") +
                                 "Sq.Ft." +
                                 " - " +
                                 (property?.maxArea || "0") +
                                 "Sq.Ft."
                              }
                              style={{ fontSize: "14px", fontWeight: "500" }}
                           />
                        </Col>
                     )}
                     <Col>
                        <Text
                           text={"Price Range"}
                           style={{ fontSize: "12px", fontWeight: "500", color: "#949494" }}
                        />
                        <Text
                           text={
                              setPrice(Number(property?.minPrice)) +
                              "-" +
                              setPrice(Number(property?.maxPrice))
                           }
                           style={{ fontSize: "14px", fontWeight: "500" }}
                        />
                     </Col>
                     {/* <Col>
                                <Text text={'Comments'} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={'Unit Basic Specification'} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </Col> */}
                  </Row>
                  <div style={{ justifySelf: "end" }}>
                     <Buttons
                        name="Edit Unit"
                        disabled={
                            props?.projectStatus === "UNDER_REVIEW" ||
                            props?.projectStatus === "REJECTED" ||
                            props?.projectStatus === "ON_HOLD"
                               ? true
                               : false
                         }
                        varient="primary"
                        onClick={() => {
                           setEditUnitFlag(true);
                           setEditPropertyId(property?.propertyId);
                        }}
                     />
                  </div>
                  <hr />
                  {editUnitFlag && editPropertyId === property?.propertyId ? (
                     <>
                        <Units
                           builderId={props?.builderId}
                           projectId={subProjectDetails?.projectId}
                           subProjectDetails={subProjectDetails}
                           property={property}
                           editUnit={true}
                           handleRemoveUnit={handleRemoveUnit}
                           fetchUnitDetails={handleFetchUnit}
                        />
                     </>
                  ) : null}
               </>
            ))}
         </div>
         {showMoreUnits ? (
            <>
               <Units
                  builderId={props?.builderId}
                  projectId={subProjectDetails?.projectId}
                  subProjectDetails={subProjectDetails}
                  handleRemoveUnit={handleRemoveUnit}
                  fetchUnitDetails={handleFetchUnit}
                  closeUnitTab={closeTab}
               />
            </>
         ) : null}
         <div>
            <Button
               className="d-flex mb-2 mt-3"
               style={{
                  color: "#BE1452",
                  backgroundColor: "#F8F3F5",
                  borderColor: "#DED6D9",
               }}
               onClick={() => {
                  if (
                     subProjectDetails.propertyType !== null &&
                     subProjectDetails.propertyType.length !== 0
                  ) {
                     setShowMoreUnits(true);
                     handleAddMoreUnit();
                  } else {
                     showErrorToast("Please select property type...");
                     return 0;
                  }
               }}
               disabled={
                props?.projectStatus === "UNDER_REVIEW" ||
                props?.projectStatus === "REJECTED" ||
                props?.projectStatus === "ON_HOLD"
                   ? true
                   : false
             }
            >
               {/* <div className='py-0'
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop:'10%'
                        }}
                    >
                        <Image className={'py-0'} src={addIcon} style={{ width: "14px", height: '14px' }} />
                    </div> */}
               <Text
                  text={"+ Add More Unit"}
                  fontWeight="bold"
                  style={{ fontSize: "12px", color: "#BE1452" }}
               />
            </Button>
         </div>
      </>
   );
};

export default SubProjectDetails;
