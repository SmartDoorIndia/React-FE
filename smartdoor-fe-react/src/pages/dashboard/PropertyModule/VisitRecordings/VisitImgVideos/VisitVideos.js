/** @format */

import React, { useEffect, useState } from "react";
import { getMediaByCameraId } from "../../../../../common/redux/actions";
import ExpandIcon from "../../../../../assets/images/expandIcon.png";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Text from "../../../../../shared/Text/Text";
import { Card, Col, Modal, Row } from "react-bootstrap";
import { formateDate, showErrorToast } from "../../../../../common/helpers/Utils";
import { TableLoader } from "../../../../../common/helpers/Loader";
import ReactPlayer from "react-player";
import Buttons from "../../../../../shared/Buttons/Buttons";

const VisitVideos = (props) => {
   const [VisitVideoList, setVisitVideoList] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(8);
   const [loading, setLoading] = useState(false);
   const [showMore, setShowMore] = useState(false);
   const [showVideo, setShowVideo] = useState(false);
   const [selectedVideo, setSelectedVideo] = useState("");

   const toDate = new Date();

   // 30 days before today
   const fromDate = new Date();
   fromDate.setDate(toDate.getDate() - 30);

   // Helper to format as "yyyy-MM-dd HH:mm:ss"
   function formatDateTime(d) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");

      const hh = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      const sec = String(d.getSeconds()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
   }

   const getMedia = (pageNo) => {
      getMediaByCameraId({
         cameraId: props?.cameraId,
         startDate: props?.startTime,
         endDate: props?.endTime,
         pageNumber: pageNo,
         pageSize: 10,
         mediaType: "VIDEO_FILE",
         dataRequiredType:
            props?.dataRequiredType === "VISIT_DATA" ? "VISIT_DATA" : "INRUSION_DATA",
      }).then((response) => {
         setLoading(false);
         if (response.data.resourceData?.length >= 1) {
            setShowMore(true);
         } else {
            setShowMore(false);
            showErrorToast(props?.dataRequiredType === "VISIT_DATA" ? "No more videos available..." : "");
         }
         if (pageNo > 1) {
            setVisitVideoList((prev) => [...prev, ...response.data.resourceData]);
         } else {
            setVisitVideoList(response.data.resourceData);
         }
      });
   };
   useEffect(() => {
      setLoading(true);
      getMedia(1);
   }, []);

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
                     props?.dataRequiredType === "VISIT_DATA" ? "VISIT VIDEOS" : "INTRUSION VIDEOS"
                  }
                  style={{ fontSize: "18px", fontWeight: "700", color: "white" }}
               ></Text>
            </AccordionSummary>
            <AccordionDetails sx={{ border: "solid 1px #DED6D9", borderRadius: "6px" }}>
               {VisitVideoList.length === 0 && !loading ? (
                  <>
                     <Text
                        className="text-center"
                        text={
                           props?.dataRequiredType === "VISIT_DATA"
                              ? "Visit videos not available"
                              : "Intrusion videos not available"
                        }
                        style={{ fontSize: "14px", fontWeight: "600", color: "#BE1452" }}
                     />
                  </>
               ) : null}
               <Row style={{ overflow: "hidden" }}>
                  {VisitVideoList.map((VisitVideo, index) => (
                     <>
                        <Col lg={4} className="mt-4">
                           <Card>
                              <Card.Body className="p-1">
                                 <div className="d-flex">
                                    <Col lg={3} className="p-1 justify-content-center">
                                       <img
                                          src={VisitVideo.mediaUrl}
                                          alt=""
                                          style={{ height: "50px", width: "50px", cursor: 'pointer' }}
                                          onClick={() => {setSelectedVideo(VisitVideo.mediaUrl); setShowVideo(true);}}
                                       />
                                    </Col>
                                    <Col lg={6} className="align-self-center">
                                       <Text
                                          text={formateDate(VisitVideo.capturedDate, "DD-MMM-YYYY")}
                                          style={{ fontSize: "13px", fontWeight: "700" }}
                                       />
                                       <Text
                                          text={formateDate(VisitVideo.capturedDate, "HH:mm:ss A")}
                                          style={{ fontSize: "13px", fontWeight: "500" }}
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
                              className="text-center mb-4"
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
            show={showVideo}
            onHide={() => {
               setShowVideo(false);
            }}
            centered
            backdrop="static"
         >
            <Modal.Header style={{justifyContent: 'end'}}>
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  varient="secondary"
                  onClick={() => {
                     setShowVideo(false);
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body>
               <div className="d-flex justify-content-center">
                  <ReactPlayer
                     url={
                        "https://smartdoor-uat.s3.ap-south-1.amazonaws.com/app-images/camera-videos/4258/4258_7fa2fd1c0086e460_1745903211000"
                     }
                     controls={true}
                     muted={false}
                     playing={true}
                     config={{
                        file: {
                           attributes: {
                              controlsList: "nodownload", // hides the download button in browsers that support it
                              disablePictureInPicture: true, // optional: block PiP
                           },
                        },
                     }}
                  />
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default VisitVideos;
