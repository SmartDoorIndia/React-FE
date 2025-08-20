/** @format */

import React, { useState } from "react";
import { Button, Card, Carousel, Modal } from "react-bootstrap";
import Text from "../../../../../shared/Text/Text";
import Divider from "../../../../../assets/images/Divider.png";
import { formateDate, formatPrice } from "../../../../../common/helpers/Utils";
import { getInternalAmenityListForBuilderProperty } from "../../../../../common/helpers/FetchAmenitiesIcons";
import StarRating from "../../../../../shared/StarRating/StarRating";
import ImageEnlargeModal from "../../../../../shared/Modal/ImageEnlargeModal";

const ExpandedBuilderProperty = (props) => {
   const { property, subProject } = props;
   const [selectedSection, setSelectedSection] = useState("Details");
   const [showModal, setShowModal] = useState(false);
   const [expandImageFlag, setExpandImageFlag] = useState(false);
   const [selectedImage, setSelectedImage] = useState("");
   const [floorPlanList, setFloorPlanList] = useState([]);
   const [amenitiesList, setAmenitiesList] = useState([]);

   useState(() => {
      let floorPlans = [];
      property.floorPlan.forEach((element) => {
         if (element.trim().length !== 0) {
            floorPlans.push(element);
         }
      });
      setFloorPlanList(floorPlans);
      let amenities = [];
      if (property?.internalAmenities?.length > 0) {
         property?.internalAmenities?.forEach((element) => {
            if (getInternalAmenityListForBuilderProperty(element) !== undefined) {
               amenities.push(element);
            }
         });
      } else {
         subProject?.amenities?.forEach((element) => {
            if (getInternalAmenityListForBuilderProperty(element) !== undefined) {
               amenities.push(element);
            }
         });
      }
      setAmenitiesList(amenities);
   }, []);

   const handleImageClose = () => {
      setExpandImageFlag(false);
   };

   return (
      <>
         <Card>
            <Carousel slide={false}>
               {property.propertyImagesList.map((image, index) => (
                  <Carousel.Item key={index}>
                     <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="d-block w-100"
                        style={{
                           objectFit: "fill",
                           height: "211px", // Adjust height as per your design
                           cursor: "pointer",
                        }}
                        onClick={() => {
                           setSelectedImage(image);
                           setExpandImageFlag(true);
                        }}
                     />
                  </Carousel.Item>
               ))}
            </Carousel>
            <div className="mt-2 d-flex justify-content-center mb-2">
               <Button
                  variant="light"
                  style={{
                     fontSize: "14px",
                     fontWeight: "500",
                     border:
                        selectedSection === "Details" ? "solid 2px #BE1452" : "solid 1px  #BEBEBE",
                     backgroundColor: "white",
                  }}
                  onClick={() => {
                     setSelectedSection("Details");
                  }}
               >
                  Details
               </Button>{" "}
               &nbsp;&nbsp;
               <Button
                  variant="light"
                  style={{
                     fontSize: "14px",
                     fontWeight: "500",
                     border:
                        selectedSection === "Amenities"
                           ? "solid 2px #BE1452"
                           : "solid 1px  #BEBEBE",
                     backgroundColor: "white",
                  }}
                  onClick={() => {
                     setSelectedSection("Amenities");
                  }}
               >
                  Amenities
               </Button>{" "}
               &nbsp;&nbsp;
               <Button
                  variant="light"
                  style={{
                     fontSize: "14px",
                     fontWeight: "500",
                     border:
                        selectedSection === "Floor Plan"
                           ? "solid 2px #BE1452"
                           : "solid 1px  #BEBEBE",
                     backgroundColor: "white",
                  }}
                  onClick={() => {
                     setSelectedSection("Floor Plan");
                  }}
               >
                  Floor Plan
               </Button>
            </div>
            {selectedSection === "Details" ? (
               <>
                  <div className="text-start ml-3">
                     <div>
                        <Text
                           text={property.compositionType || "N/A"}
                           style={{ fontSize: "16px", fontWeight: "700" }}
                        />
                     </div>
                     <div>
                        <Text
                           text={property.minArea + "Sq.Ft. - " + property.maxArea + "Sq.Ft."}
                           style={{ fontSize: "14px", fontWeight: "700" }}
                        />
                     </div>
                     <div className="text-start w-auto d-flex">
                        <Text
                           className="mt-2"
                           text={"Amenities:"}
                           style={{ fontSize: "13px", fontWeight: "700" }}
                        />
                        <StarRating rating={property?.amenitiesRating} />
                     </div>
                     <div className="d-flex">
                        <Text
                           text={subProject.projectName}
                           style={{ fontSize: "13px", fontWeight: "700" }}
                        />{" "}
                        &nbsp;
                        <img
                           className="mt-1"
                           src={Divider}
                           style={{ height: "8px", width: "8px" }}
                           alt=""
                        />{" "}
                        &nbsp;
                        <Text
                           text={"Total Floors:" + subProject.totalFloors}
                           style={{ fontSize: "13px", fontWeight: "700" }}
                        />
                     </div>
                     <div className="d-flex">
                        <Text
                           text={"Total Units:" + subProject.totalUnits}
                           style={{ fontSize: "13px", fontWeight: "700" }}
                        />{" "}
                        &nbsp;
                        <img
                           className="mt-1"
                           src={Divider}
                           style={{ height: "8px", width: "8px" }}
                           alt=""
                        />{" "}
                        &nbsp;
                        <Text
                           text={"Units Per Floor:" + subProject.unitsPerFloor}
                           style={{ fontSize: "13px", fontWeight: "700" }}
                        />
                     </div>
                     <div>
                        <Text
                           text={
                              "Possession: " +
                              formateDate(property.possessionFrom, "MMMM YYYY") +
                              " - " +
                              formateDate(property.possessionTo, "MMMM YYYY")
                           }
                           style={{ fontSize: "13px", fontWeight: "700" }}
                        />
                     </div>
                     <div>
                        <Text
                           text={
                              "₹" +
                              formatPrice(property.minPrice) +
                              " - ₹" +
                              formatPrice(property.maxPrice)
                           }
                           style={{ fontSize: "18px", fontWeight: "800", color: "#BE1452" }}
                        />
                     </div>
                  </div>
                  <hr className="ms-2 me-2" />
                  <div className="text-start ml-3">
                     <div>
                        <Text
                           text={"Tower Details"}
                           style={{ fontSize: "15px", fontWeight: "700" }}
                        />
                     </div>
                     <div className="row col-12">
                        <div className="col-6">
                           <div>
                              <Text
                                 text={"Rera No."}
                                 style={{ fontSize: "13px", fontWeight: "500", color: "#949494" }}
                              />
                           </div>
                           <div>
                              <Text
                                 text={subProject.reraNumber}
                                 style={{ fontSize: "15px", fontWeight: "700" }}
                              />
                           </div>
                        </div>
                        <div className="col-6">
                           <div className="p-0">
                              <Text
                                 text={"Total Area to Develop"}
                                 style={{ fontSize: "13px", fontWeight: "500", color: "#949494" }}
                              />
                           </div>
                           <div>
                              <Text
                                 text={subProject?.totalAreaToDevelop + "Sq.Ft." || "0.0 Sq.Ft."}
                                 style={{ fontSize: "15px", fontWeight: "700" }}
                              />
                           </div>
                        </div>
                     </div>
                     <hr className="ms-2 me-2" />
                  </div>
                  <div className="text-start ml-3">
                     <div>
                        <Text
                           text={"HighLights/USP"}
                           style={{ fontSize: "16px", fontWeight: "700" }}
                        />
                     </div>
                     <div>
                        <Text
                           text={subProject.highlights}
                           style={{ fontSize: "13px", fontWeight: "700", color: "#949494" }}
                        />
                     </div>
                  </div>
               </>
            ) : null}
            {selectedSection === "Amenities" ? (
               <>
                  <div className="row justify-content-start ml-4">
                     {amenitiesList?.length > 0 ? (
                        <>
                           {amenitiesList?.map((element) => (
                              <>
                                 <Card
                                    className="text-center align-items-center mt-2 col-3 ms-2"
                                    style={{ height: "90px" }}
                                 >
                                    <img
                                       className="mt-2"
                                       src={getInternalAmenityListForBuilderProperty(element)}
                                       alt=""
                                       style={{ height: "32px", width: "32px" }}
                                    />
                                    <Text
                                       text={element}
                                       style={{ fontSize: "12px", fontWeight: "500" }}
                                    />
                                 </Card>{" "}
                                 &nbsp;
                                 {/* {getInternalAmenityListForBuilderProperty(element) !== undefined ?
                                                <>
                                                </>
                                                : null} */}
                              </>
                           ))}
                        </>
                     ) : (
                        <Text
                           text={"No Amenities available"}
                           style={{ fontSize: "16px", fontWeight: "600" }}
                        />
                     )}
                  </div>
               </>
            ) : null}
            {selectedSection === "Floor Plan" ? (
               <>
                  <div className="d-flex ml-3">
                     {floorPlanList?.length > 0 ? (
                        <>
                           {floorPlanList?.map((element) => (
                              <>
                                 <div
                                    className="text-center align-items-center mt-2"
                                    style={{
                                       width: "90px",
                                       height: "90px",
                                       border: "none",
                                       boxShadow: "0px 0px 8.9px 0px",
                                       borderRadius: "11px",
                                    }}
                                 >
                                    <img
                                       className="w-100 h-100"
                                       src={element}
                                       alt=""
                                       style={{
                                          border: "none",
                                          borderRadius: "11px",
                                          cursor: "pointer",
                                       }}
                                       onClick={() => {
                                          setSelectedImage(element);
                                          setExpandImageFlag(true);
                                       }}
                                    />
                                 </div>{" "}
                                 &nbsp;
                              </>
                           ))}
                        </>
                     ) : (
                        <Text
                           text={"No Floor Plan available"}
                           style={{ fontSize: "16px", fontWeight: "600" }}
                        />
                     )}
                  </div>
               </>
            ) : null}
            <div className="p-2">
               <Button
                  className="w-100 px-2"
                  style={{ backgroundColor: "#BE1452", color: "white", border: "none" }}
                  // onClick={() => { setShowModal(true) }}
               >
                  Call Now
               </Button>
            </div>
         </Card>

         <Modal
            show={showModal}
            onHide={() => {
               setShowModal(false);
            }}
            centered
         >
            <Modal.Body className="text-center">
               <Text
                  text={"Contact: " + property?.contactNumber}
                  style={{ fontSize: "16px", fontWeight: "700" }}
               />
            </Modal.Body>
         </Modal>
         <ImageEnlargeModal
            show={expandImageFlag}
            handleClose={handleImageClose}
            selectedImage={selectedImage}
         ></ImageEnlargeModal>
      </>
   );
};

export default ExpandedBuilderProperty;
