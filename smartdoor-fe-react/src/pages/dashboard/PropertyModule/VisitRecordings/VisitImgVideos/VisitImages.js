/** @format */

import React, { useEffect, useState } from "react";
import { getMediaByCameraId } from "../../../../../common/redux/actions";
import ExpandIcon from "../../../../../assets/images/expandIcon.png";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Text from "../../../../../shared/Text/Text";
import { Card, Col, Modal, Row } from "react-bootstrap";
import { formateDate, showErrorToast } from "../../../../../common/helpers/Utils";
import { FallBackLoader, TableLoader } from "../../../../../common/helpers/Loader";
import Buttons from "../../../../../shared/Buttons/Buttons";
import downloadIcon from "../../../../../assets/images/downloads.png";

const VisitImages = (props) => {
   const [visitImages, setVisitImages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [showMore, setShowMore] = useState(false);
   const [showImage, setShowImage] = useState(false);
   const [selectedImg, setSelectedImg] = useState("");

   const getMedia = (pageNo) => {
      getMediaByCameraId({
         cameraId: props?.cameraId,
         startDate: props?.startTime,
         endDate: props?.endTime,
         pageNumber: pageNo,
         pageSize: 10,
         mediaType: "IMAGE_FILE",
         dataRequiredType: props?.dataRequiredType,
      }).then((response) => {
         setLoading(false);
         if (response.data.resourceData?.length >= 1) {
            setShowMore(true);
         } else {
            setShowMore(false);
            showErrorToast(
               props?.dataRequiredType === "VISIT_DATA" ? "No more images available..." : ""
            );
         }
         if (pageNo > 1) {
            setVisitImages((prev) => [...prev, ...response.data.resourceData]);
         } else {
            setVisitImages(response.data.resourceData);
         }
      });
   };

   useEffect(() => {
      setLoading(true);
      getMedia(1);
   }, []);

   const downloadImage = async (imageUrl) => {
      try {
         const response = await fetch(imageUrl);
         const blob = await response.blob();
         const url = window.URL.createObjectURL(blob);

         const link = document.createElement("a");
         link.href = url;

         // Extract filename from URL or use a default name
         const filename = imageUrl.split("/").pop() || "download.jpg";
         link.download = filename;

         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);

         // Clean up the URL object
         window.URL.revokeObjectURL(url);
      } catch (error) {
         console.error("Error downloading image:", error);
         // You can add toast notification here
      }
   };

   return (
      <>
         <Accordion defaultExpanded={true} className="mb-3" style={{ boxShadow: "none" }}>
            <AccordionSummary
               expandIcon={<img src={ExpandIcon} alt="" />}
               aria-controls="panel1-content"
               id="panel1-header"
               sx={{
                  backgroundColor: "#BE1452",
                  borderRadius: "5px",
                  "&.Mui-expanded": {
                     minHeight: "42px",
                     height: "42px",
                  },
                  height: "42px !important",
                  boxShadow: "none",
               }}
            >
               <Text
                  className="page-title ml-3"
                  text={
                     props?.dataRequiredType === "VISIT_DATA" ? "VISIT IMAGES" : "INTRUSION IMAGES"
                  }
                  style={{ fontSize: "18px", fontWeight: "700", color: "white" }}
               ></Text>
            </AccordionSummary>
            <AccordionDetails sx={{ border: "solid 1px #DED6D9", borderRadius: "6px" }}>
               {visitImages.length === 0 && !loading ? (
                  <>
                     <Text
                        className="text-center"
                        text={
                           props?.dataRequiredType === "VISIT_DATA"
                              ? "Visit images not available"
                              : "Intrusion images not available"
                        }
                        style={{ fontSize: "14px", fontWeight: "600", color: "#BE1452" }}
                     />
                  </>
               ) : null}
               <Row style={{ overflow: "hidden" }}>
                  {visitImages.map((visitImage, index) => (
                     <>
                        <Col lg={4} className="mt-4">
                           <Card>
                              <Card.Body className="p-1">
                                 <div className="d-flex">
                                    <Col lg={3} className="p-1 justify-content-center">
                                       <img
                                          src={visitImage.mediaUrl}
                                          alt=""
                                          style={{
                                             height: "50px",
                                             width: "50px",
                                             cursor: "pointer",
                                          }}
                                          onClick={() => {
                                             setSelectedImg(visitImage.mediaUrl);
                                             setShowImage(true);
                                          }}
                                       />
                                    </Col>
                                    <Col lg={6} className="align-self-center">
                                       <Text
                                          text={formateDate(visitImage.capturedDate, "DD-MMM-YYYY")}
                                          style={{ fontSize: "13px", fontWeight: "700" }}
                                       />
                                       <Text
                                          text={formateDate(visitImage.capturedDate, "HH:mm:ss A")}
                                          style={{ fontSize: "13px", fontWeight: "500" }}
                                       />
                                    </Col>
                                    <Col lg={1} className="align-self-center">
                                       <img
                                          src={downloadIcon}
                                          alt=""
                                          onClick={() => {
                                             downloadImage(visitImage.mediaUrl);
                                          }}
                                       />
                                    </Col>
                                 </div>
                              </Card.Body>
                           </Card>
                        </Col>
                     </>
                  ))}
               </Row>
               {!loading ? (
                  <>
                     {showMore ? (
                        <div className="text-center mt-2">
                           <Text
                              onClick={() => {
                                 setLoading(true);
                                 getMedia(currentPage + 1);
                                 setCurrentPage(currentPage + 1);
                              }}
                              className="d-inline-block text-center mb-4 showmoreBellicon"
                              alt="show more"
                              fontWeight="mediumbold"
                              color="primaryColor"
                              text={"Show More"}
                           />
                        </div>
                     ) : null}
                  </>
               ) : (
                  <TableLoader />
               )}
            </AccordionDetails>
         </Accordion>
         <Modal
            show={showImage}
            onHide={() => {
               setShowImage(false);
            }}
            centered
            backdrop="static"
         >
            <Modal.Header style={{ justifyContent: "end" }}>
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  varient="secondary"
                  onClick={() => {
                     setShowImage(false);
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
               <img src={selectedImg} alt="" style={{ width: "250px", height: "250px" }} />
            </Modal.Body>
         </Modal>
      </>
   );
};

export default VisitImages;
