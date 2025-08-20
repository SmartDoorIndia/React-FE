/** @format */

import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import Text from "../../../../shared/Text/Text";
import { formateDate, formatPrice, showErrorToast } from "../../../../common/helpers/Utils";
import readyWhite from "../../../../assets/images/Ready-white.png";
import underConstrWhite from "../../../../assets/images/underConstr-white.png";
import StarRating from "../../../../shared/StarRating/StarRating";
import LocationOutline from "../../../../assets/images/Location-outline.png";
import detailIcon from "../../../../assets/images/detailIcon.png";
import playIcon from "../../../../assets/images/playIcon.png";
import facebookIcon from "../../../../assets/images/facebookIcon.png";
import instagramIcon from "../../../../assets/images/instagramIcom.png";
import whatsappIcon from "../../../../assets/images/whatsappIcon.png";
import share from "../../../../assets/images/share.png";
import BuilderProperty from "../ProjectPreview/BuilderProperty/BuilderProperty";
import "./ProjectPreview.scss";

const ProjectPreview = (props) => {
   const [projectDetails, setProjectDetails] = useState(props?.projectDetails);
   const [subProjectList, setSubProjectList] = useState(props?.subProjectList);
   useEffect(() => {
      // console.log(props?.projectDetails);
   }, [projectDetails]);

   return (
      <>
         <div className="main-div">
            <Carousel slide={false}>
               {projectDetails?.builderProjectSearchDto[0]?.projectImages?.map((image, index) => (
                  <Carousel.Item key={index}>
                     <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="d-block w-100"
                        style={{
                           borderTopLeftRadius: "6px",
                           borderTopRightRadius: "6px",
                           objectFit: "fill",
                           height: "211px", // Adjust height as per your design
                           cursor: "pointer",
                        }}
                     />
                  </Carousel.Item>
               ))}
            </Carousel>
            <Card.Footer
               className="w-100 p-0 d-flex justify-content-center align-items-center"
               style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  width: "100%",
                  padding: "0",
               }}
            >
               <img
                  src={
                     projectDetails?.builderProjectSearchDto[0]?.stageOfProperty === "Ready"
                        ? readyWhite
                        : underConstrWhite
                  }
                  alt=""
                  style={{ height: "15px", width: "15px" }}
               />{" "}
               &nbsp;&nbsp;
               {/* <Text text={property.stageOfProperty + ' | Age: ' + (property.ageOfProperty !== null ? property.ageOfProperty : '0') + 'Yrs'} style={{ fontSize: '12px', fontWeight: '500', color: 'white' }} /> */}
               {projectDetails?.builderProjectSearchDto[0]?.stageOfProperty === "Ready" ? (
                  <Text
                     text={
                        projectDetails?.builderProjectSearchDto[0]?.stageOfProperty +
                        " | Age: " +
                        (projectDetails?.builderProjectSearchDto[0]?.ageOfProperty !== null
                           ? projectDetails?.builderProjectSearchDto[0]?.ageOfProperty
                           : "0") +
                        "Yrs"
                     }
                     style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "white",
                     }}
                  />
               ) : (
                  <Text
                     text={
                        (projectDetails?.builderProjectSearchDto[0]?.stageOfProperty ||
                           "UNDER CONSTRUCTION") +
                        " | POSSESSION: " +
                        formateDate(
                           projectDetails?.builderProjectSearchDto[0]?.possessionTo,
                           "MMMM YYYY"
                        )
                     }
                     style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "white",
                     }}
                  />
               )}
            </Card.Footer>
            <div className="d-flex mt-2">
               <div className="col-10">
                  <div className=" text-start">
                     <Text
                        text={projectDetails?.builderProjectSearchDto[0]?.projectName}
                        style={{ fontSize: "20px", fontWeight: "700" }}
                     />
                  </div>
                  <div className="d-flex text-start">
                     <Text text="Amenities: " style={{ fontSize: "13px", fontWeight: "700" }} />
                     <StarRating
                        rating={projectDetails?.builderProjectSearchDto[0]?.amenitiesRating}
                     />
                  </div>
                  <div className="d-flex mt-2 text-start w-100 ">
                     <img
                        src={LocationOutline}
                        alt=""
                        style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        onClick={async (e) => {
                           await e.stopPropagation();
                           let mapUrl =
                              "https://www.google.com/maps/search/?api=1&query=" +
                              projectDetails?.builderProjectSearchDto[0]?.latitude +
                              "," +
                              projectDetails?.builderProjectSearchDto[0]?.longitude;
                           window.open(mapUrl, "_blank");
                        }}
                     />
                     <Text
                        text={projectDetails?.builderProjectSearchDto[0]?.projectAddress || "N/A"}
                        style={{ fontSize: "12px", fontWeight: "500" }}
                     />
                  </div>
                  <div className="mt-2 text-start p-0">
                     <Text
                        text={
                           "₹" +
                           formatPrice(projectDetails?.builderProjectSearchDto[0]?.priceMin) +
                           " - ₹" +
                           formatPrice(projectDetails?.builderProjectSearchDto[0]?.priceMax)
                        }
                        style={{
                           fontSize: "18px",
                           fontWeight: "800",
                           color: "#BE1452",
                        }}
                     />
                  </div>
                  <div className="d-flex text-start mt-2">
                     <Text
                        className="p-0"
                        text={
                           " Total Towers: " +
                           (projectDetails?.builderProjectSearchDto[0]?.totalTowers !== null
                              ? projectDetails?.builderProjectSearchDto[0]?.totalTowers
                              : "-")
                        }
                        style={{ fontSize: "13px", fontWeight: "700" }}
                     />{" "}
                  </div>
                  <div className="d-flex text-start mt-2">
                     <Text
                        className="p-0"
                        text={
                           " Highest Floor: " +
                           (projectDetails?.builderProjectSearchDto[0]?.highestFloor !== null
                              ? projectDetails?.builderProjectSearchDto[0]?.highestFloor
                              : "-")
                        }
                        style={{ fontSize: "13px", fontWeight: "700" }}
                     />
                  </div>
                  <div className=" text-start mt-2">
                     <Text
                        text={projectDetails?.builderProjectSearchDto[0]?.propertyCombinations
                           ?.filter((item) => item.trim() !== "") // Exclude empty or whitespace-only strings
                           .join(", ")}
                        style={{ fontSize: "13px", fontWeight: "700" }}
                     />
                  </div>
                  <div className=" text-start mt-2">
                     <Text
                        text={projectDetails?.builderProjectSearchDto[0]?.projectDescription}
                        style={{
                           fontSize: "12px",
                           fontWeight: "700",
                           color: "#949494",
                        }}
                     />
                  </div>
               </div>
               <div>
                  <div className="d-flex justify-content-end">
                     <div
                        className=""
                        style={{
                           backgroundColor: "#D9D9D9",
                           borderRadius: "50px",
                           width: "24px",
                           height: "24px",
                        }}
                     >
                        <img
                           src={playIcon}
                           alt=""
                           className="mt-0 ml-1"
                           style={{ scale: "1", cursor: "pointer" }}
                           onClick={() => {
                              if (
                                 projectDetails?.builderProjectSearchDto[0]?.projectVideoUrl !==
                                 null
                              ) {
                                 window.open(
                                    projectDetails?.builderProjectSearchDto[0]?.projectVideoUrl,
                                    "_blank"
                                 );
                              } else {
                                 showErrorToast("Project Video not available");
                              }
                           }}
                        />
                     </div>{" "}
                     &nbsp;&nbsp;
                     <div
                        className=""
                        style={{
                           backgroundColor: "#D9D9D9",
                           borderRadius: "50px",
                           width: "24px",
                           height: "24px",
                        }}
                     >
                        <img
                           src={detailIcon}
                           alt=""
                           className="mt-0 ml-1"
                           style={{ scale: "1", cursor: "pointer" }}
                           onClick={() => {
                              if (
                                 projectDetails?.builderProjectSearchDto[0]?.brochureUrl !== null
                              ) {
                                 window.open(
                                    projectDetails?.builderProjectSearchDto[0]?.brochureUrl,
                                    "_blank"
                                 );
                              } else {
                                 showErrorToast("Project Video not available");
                              }
                           }}
                        />
                     </div>
                  </div>

                  <div className="" style={{ justifySelf: "end" }}>
                     <img
                        src={share}
                        alt=""
                        style={{ scale: "1.3", cursor: "pointer" }}
                        //  onClick={async (e) => {
                        //     let shareUrl = await projectShare(
                        //        projectDetails?.builderProjectSearchDto[0]?.projectId
                        //     );
                        //     setShareURL(shareUrl);
                        //     setShareModal(true);
                        //  }}
                     />
                  </div>
               </div>
            </div>
            <hr />
            <Row className="p-0">
               <Col className="text-center p-0" md={4} xs={3}>
                  <div className="">
                     <Text
                        text="Land Area"
                        style={{
                           fontSize: "12px",
                           fontWeight: "500",
                           color: "#949494",
                        }}
                     />
                  </div>
                  <div className="">
                     <Text
                        text={projectDetails?.builderProjectSearchDto[0]?.landArea + " Acre"}
                        style={{ fontSize: "14px", fontWeight: "500" }}
                     />
                  </div>
               </Col>
               <Col className="text-center p-0" md={4} xs={5}>
                  <div className="">
                     <Text
                        text="Total Area to Develop"
                        style={{
                           fontSize: "12px",
                           fontWeight: "500",
                           color: "#949494",
                        }}
                     />
                  </div>
                  <div className="">
                     <Text
                        text={
                           projectDetails?.builderProjectSearchDto[0]?.totalAreaToDevelop +
                              " Sq.Ft." || "0" + " Sq.Ft."
                        }
                        style={{ fontSize: "14px", fontWeight: "500" }}
                     />
                  </div>
               </Col>
               <Col className="text-center p-0" md={4} xs={4}>
                  <div className="">
                     <Text
                        text="Open Area "
                        style={{
                           fontSize: "12px",
                           fontWeight: "500",
                           color: "#949494",
                        }}
                     />
                  </div>
                  <div className="">
                     <Text
                        text={projectDetails?.builderProjectSearchDto[0]?.openAreaPercent + "%"}
                        style={{ fontSize: "14px", fontWeight: "500" }}
                     />
                  </div>
               </Col>
            </Row>
            <div className="mt-4 d-flex ml-3">
               <img
                  className="col-3 p-0"
                  src={projectDetails?.builderProjectSearchDto[0]?.companyLogoImageUrl}
                  alt=""
                  style={{
                     width: "74px",
                     height: "86px",
                     borderRadius: "64px",
                     border: "solid 2px #BE1452",
                  }}
               />
               <div className="mt-3 col-9 text-start">
                  <div>
                     <Text
                        text={projectDetails?.builderProjectSearchDto[0]?.companyName}
                        style={{ fontSize: "16px", fontWeight: "700" }}
                     />
                  </div>
                  <div>
                     <Text
                        text={projectDetails?.builderProjectSearchDto[0]?.builderName}
                        style={{ fontSize: "13px", fontWeight: "700" }}
                     />
                  </div>
               </div>
            </div>
            <div className="d-flex mt-2 ml-3">
               <img
                  src={facebookIcon}
                  alt=""
                  style={{ width: "26px", height: "26px", cursor: "pointer" }}
                  onClick={() => {
                     if (projectDetails?.builderProjectSearchDto[0]?.companyFacebookUrl !== null) {
                        window.open(
                           projectDetails?.builderProjectSearchDto[0]?.companyFacebookUrl,
                           "_blank"
                        );
                     } else {
                        showErrorToast("Facebook URL not available");
                     }
                  }}
               />{" "}
               &nbsp;&nbsp;&nbsp;
               <img
                  src={instagramIcon}
                  alt=""
                  style={{ width: "26px", height: "26px", cursor: "pointer" }}
                  onClick={() => {
                     if (projectDetails?.builderProjectSearchDto[0]?.companyInstagramUrl !== null) {
                        window.open(
                           projectDetails?.builderProjectSearchDto[0]?.companyInstagramUrl,
                           "_blank"
                        );
                     } else {
                        showErrorToast("Instagram URL not available");
                     }
                  }}
               />{" "}
               &nbsp;&nbsp;&nbsp;
               <img
                  src={whatsappIcon}
                  alt=""
                  style={{ width: "26px", height: "26px", cursor: "pointer" }}
                  //    onClick={() => {
                  //       setShowModal(true);
                  //    }}
               />
            </div>
            <div className="text-start mt-2 ml-3">
               <div>
                  <Text
                     text={"Email"}
                     style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#949494",
                     }}
                  />
               </div>
               <div>
                  <Text
                     text={projectDetails?.builderProjectSearchDto[0]?.companyEmail || "N/A"}
                     style={{ fontSize: "14px", fontWeight: "500" }}
                  />
               </div>
            </div>
            <div>
               {subProjectList?.length > 0 ? (
                  <>
                     {subProjectList?.map((subProject, index) => (
                        <>
                        {subProject?.properties?.length > 0 ? (
                           <>
                                    <BuilderProperty builderPropertyDetailList={subProject?.properties} subProject={subProject} />
                              {/* {subProject?.properties?.map((property, propIndex) => (
                                 <>
                                 </>
                              ))} */}
                           </>
                        ) : null}
                        </>
                     ))}
                  </>
               ) : null}
            </div>
         </div>
      </>
   );
};

export default ProjectPreview;
