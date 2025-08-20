/** @format */

import { Accordion, AccordionDetails, AccordionSummary, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { fetchBuilderProjectById, setProjectStatus } from "../../../../common/redux/actions";
import Text from "../../../../shared/Text/Text";
import ExpandIcon from "../../../../assets/images/expandIcon.png";
import ProjectDetails from "./ProjectDetails/ProjectDetails";
import SubProjectDetails from "./SubProjectDetails/SubProjectDetails";
import Image from "../../../../shared/Image";
import addIcon from "../../../../assets/svg/add.svg";
import { Button, Col, Modal, Row } from "react-bootstrap";
import AddNewSubProject from "../AddNewSubProject/AddNewSubProject";
import { FallBackLoader } from "../../../../common/helpers/Loader";
import Buttons from "../../../../shared/Buttons/Buttons";
import {
   getLocalStorage,
   showErrorToast,
   showSuccessToast,
   ToolTip,
} from "../../../../common/helpers/Utils";
import ProjectPreview from "../ProjectPreview/ProjectPreview";

const ProjectDetailsPage = (props) => {
   const [projectDetails, setProjectDetails] = useState({
      builderProjectSearchDto: [],
   });
   const [subProjectList, setSubProjectList] = useState([]);
   const [addTowerFlag, setAddTowerFlag] = useState(false);
   const [loading, setLoading] = useState(false);
   const [rejectModal, setRejectModal] = useState(false);
   const [rejectionComment, setRejectComment] = useState("");
   const [previewModal, setPreviewModal] = useState(false);
   const userData = getLocalStorage("authData");

   useEffect(() => {
      // console.log(props?.location?.state?.projectId);
      setLoading(true);
      fetchBuilderProjectById({
         projectId: props?.location?.state?.projectId,
         builderId: props?.location?.state?.builderId,
      }).then((response) => {
         setLoading(false);
         console.log(response);
         setProjectDetails(response?.data?.resourceData);
         if (response?.data?.resourceData?.subProjectList !== null) {
            setSubProjectList([...response?.data?.resourceData?.subProjectList]);
         }
      });
   }, []);

   const handleShowProjectPost = useCallback(async () => {
      // console.log("handleShowProjectPost called in ProjectDetailsPage");
      // console.log(props);
      setLoading(true);
      const response = await fetchBuilderProjectById({
         projectId: props?.location?.state?.projectId,
         builderId: props?.location?.state?.builderId,
      });
      setLoading(false);
      if (response?.status === 200) {
         setProjectDetails(response?.data?.resourceData);
         if (response?.data?.resourceData?.subProjectList !== null) {
            setSubProjectList([...response?.data?.resourceData?.subProjectList]);
         }
      }
   }, [projectDetails, props?.builderId]);

   const addMoreTower = () => {
      if (projectDetails?.builderProjectSearchDto[0]?.totalTowers > subProjectList?.length) {
         setAddTowerFlag(true);
      } else {
         showErrorToast("Please update total tower number...");
         return null;
      }
      setAddTowerFlag(true);
   };

   const updateSubProjectList = (subProjectData) => {
      setAddTowerFlag(false);
      subProjectList.push(subProjectData);
      let projectInfo = { ...projectDetails };
      projectInfo.subProjectList = [...subProjectList];
      setProjectDetails((prevDetails) => ({ ...prevDetails, projectInfo }));
   };

   const closeNewTower = () => {
      setAddTowerFlag(false);
   };

   const changeBuilderProjectStatus = async (status, comment) => {
      setLoading(true);
      if (status === "REJECTED") {
         if (comment?.trim()?.length === 0 || comment === null) {
            showErrorToast("Please enter rejection comment");
            setLoading(false);
            return null;
         }
      }
      const response = await setProjectStatus({
         builderId: props?.location?.state?.builderId,
         projectId: props?.location?.state?.projectId,
         //  userId: projectDetails?.userId,
         status: status,
         rejectionComment: comment,
         //  adminId: userData?.userid,
      });
      setLoading(false);
      if (response?.status === 200) {
         if (status === "ON_HOLD") {
            showSuccessToast("Project set on hold");
         } else if (status === "RESTORE") {
            showSuccessToast("Project restored successfully");
         } else if (status === "APPROVED") {
            showSuccessToast("Project approved successfully");
         } else if (status === "REJECTED") {
            showSuccessToast("Project rejected successfully");
         }
         setRejectModal(false);
         fetchBuilderProjectById({
            projectId: props?.location?.state?.projectId,
            builderId: props?.location?.state?.builderId,
         }).then((response) => {
            setLoading(false);
            console.log(response);
            setProjectDetails(response?.data?.resourceData);
            if (response?.data?.resourceData?.subProjectList !== null) {
               setSubProjectList([...response?.data?.resourceData?.subProjectList]);
            }
         });
      }
      // console.log(response);
   };

   const updateSubProjectData = (subProject) => {
      const updatedList = subProjectList.map((project) =>
         project?.projectId === subProject?.projectId ? subProject : project
      );
      setSubProjectList(updatedList);
   };

   return (
      <>
         {loading ? (
            <>
               <FallBackLoader />
            </>
         ) : null}
         <div className="" style={{ overflowX: "hidden" }}>
            {/* <Buttons name="Edit" varient="primary" onClick={() => { history.push('/admin/builders/builder-details/add-new-project', { projectId: props?.location?.state?.projectId, builderId: props?.location?.state?.builderId, projectDetails: props?.location?.state?.projectDetails, editProject: true }) }} /> */}
            {userData?.roleName === "SUPER ADMIN" ? (
               <>
                  {projectDetails?.builderProjectSearchDto[0]?.status === "UNDER_REVIEW" ? (
                     <>
                        <Buttons
                           // type="success"
                           name="APPROVE"
                           className="mb-3"
                           onClick={() => {
                              changeBuilderProjectStatus("APPROVED", "");
                           }}
                        ></Buttons>{" "}
                        &nbsp;&nbsp;
                        <Buttons
                           // type="danger"
                           name="REJECT"
                           className="mb-3"
                           onClick={() => {
                              setRejectModal(true);
                           }}
                        ></Buttons>
                     </>
                  ) : null}
                  {projectDetails?.builderProjectSearchDto[0]?.status === "APPROVED" ? (
                     <>
                        <Buttons
                           // type="success"
                           name="ON HOLD"
                           className="mb-3"
                           onClick={() => {
                              changeBuilderProjectStatus("ON_HOLD", "");
                           }}
                        ></Buttons>
                     </>
                  ) : null}
                  {projectDetails?.builderProjectSearchDto[0]?.status === "ON_HOLD" ? (
                     <>
                        <Buttons
                           // type="success"
                           name="RESTORE"
                           className="mb-3"
                           onClick={() => {
                              changeBuilderProjectStatus("RESTORE", "");
                           }}
                        ></Buttons>
                     </>
                  ) : null}
               </>
            ) : null}
            {projectDetails?.builderProjectSearchDto[0]?.status === "ON_HOLD" ? (
               <>
                  <Text
                     text={"Project is on hold. Project Edit and add/edit tower is disabled."}
                     style={{ fontSize: "14px", fontWeight: "600", color: "#BE1452" }}
                  />
               </>
            ) : null}
            {projectDetails?.builderProjectSearchDto[0]?.status === "UNDER_REVIEW" ? (
               <>
                  <Text
                     text={
                        "Your project is currently under review and will be visible to customers once approved."
                     }
                     style={{ fontSize: "14px", fontWeight: "600", color: "#BE1452" }}
                  />
               </>
            ) : null}
            {projectDetails?.builderProjectSearchDto[0]?.status === "REJECTED" ? (
               <>
                  <Text
                     text={
                        "Project is rejected due to " +
                        projectDetails?.builderProjectSearchDto[0]?.rejectionComment
                     }
                     style={{ fontSize: "14px", fontWeight: "600", color: "#BE1452" }}
                  />
               </>
            ) : null}
            {userData.roleName !== "SUPER ADMIN" ? (
               <Text
                  text="To ensure your project listing becomes visible, please make sure to add towers and units if you haven’t already."
                  style={{ fontSize: "16px", fontWeight: "700", color: "#BE1452" }}
               />
            ) : null}
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
                     text={"PROJECT DETAIL"}
                     style={{ fontSize: "18px", fontWeight: "700", color: "white" }}
                  ></Text>
               </AccordionSummary>
               <AccordionDetails sx={{ border: "solid 1px #DED6D9", borderRadius: "6px" }}>
                  <ProjectDetails
                     projectDetails={projectDetails?.builderProjectSearchDto[0]}
                     builderId={props?.location?.state?.builderId}
                     handleProjectEdit={handleShowProjectPost}
                  />
               </AccordionDetails>
            </Accordion>
            {/* {subProjectList.length === 0 ?
                : null} */}
            {userData.roleName !== "SUPER ADMIN" ? (
               <>
                  <Text
                     text="Please add towers and units to your project if they haven’t been added yet."
                     style={{ fontSize: "16px", fontWeight: "700", color: "#BE1452" }}
                  />
                  <Text
                     text="If you'd like to add a new tower, click the button below."
                     style={{ fontSize: "16px", fontWeight: "700", color: "#BE1452" }}
                  />
               </>
            ) : null}
            {subProjectList?.map((subProject, index) => (
               <>
                  <Accordion
                     defaultExpanded={index === subProjectList?.length - 1 ? true : false}
                     style={{ boxShadow: "none" }}
                  >
                     <AccordionSummary
                        expandIcon={<img src={ExpandIcon} alt="" />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                           backgroundColor: "#E9E9E9",
                           borderRadius: "5px",
                           "&.Mui-expanded": {
                              minHeight: "42px",
                              height: "42px",
                           },
                           boxShadow: "none",
                           height: "42px !important",
                        }}
                     >
                        <div className="row col-12">
                           <div className="col-4 d-flex">
                              <Text
                                 className="page-title"
                                 text={"TOWER / PLOTTED"}
                                 style={{ fontSize: "18px", fontWeight: "700", color: "black" }}
                              ></Text>{" "}
                              &nbsp;&nbsp;&nbsp;
                              <Text
                                 className="text-center"
                                 text={index + 1}
                                 style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "white",
                                    backgroundColor: "#BE1452",
                                    borderRadius: "4px",
                                    width: "24px",
                                    height: "24px",
                                 }}
                              />
                           </div>
                        </div>
                     </AccordionSummary>
                     <AccordionDetails sx={{ border: "solid 1px #DED6D9", borderRadius: "6px" }}>
                        <SubProjectDetails
                           subProjectDetails={subProject}
                           projectDetails={projectDetails}
                           builderId={props?.location?.state?.builderId}
                           parentProjectId={props?.location?.state?.projectId}
                           projectStatus={projectDetails?.builderProjectSearchDto[0]?.status}
                           updateSubProjectData={updateSubProjectData}
                        />
                     </AccordionDetails>
                  </Accordion>
               </>
            ))}
            {addTowerFlag ? (
               <>
                  <Accordion defaultExpanded={true} style={{ boxShadow: "none" }}>
                     <AccordionSummary
                        expandIcon={<img src={ExpandIcon} alt="" />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                           backgroundColor: "#E9E9E9",
                           borderRadius: "5px",
                           "&.Mui-expanded": {
                              minHeight: "42px",
                              height: "42px",
                           },
                           boxShadow: "none",
                           height: "42px !important",
                        }}
                     >
                        <div className="row col-12">
                           <div className="col-4 d-flex">
                              <Text
                                 className="page-title"
                                 text={"TOWER / PLOTTED"}
                                 style={{ fontSize: "18px", fontWeight: "700", color: "black" }}
                              ></Text>{" "}
                              &nbsp;&nbsp;&nbsp;
                              <Text
                                 className="text-center"
                                 text={"New"}
                                 style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "white",
                                    backgroundColor: "#BE1452",
                                    borderRadius: "4px",
                                    width: "40px",
                                    height: "24px",
                                 }}
                              />
                           </div>
                        </div>
                     </AccordionSummary>
                     <AccordionDetails sx={{ border: "solid 1px #DED6D9", borderRadius: "6px" }}>
                        <AddNewSubProject
                           projectId={props?.location?.state?.projectId}
                           builderId={props?.location?.state?.builderId}
                           projectDetails={projectDetails}
                           updateSubProjectList={updateSubProjectList}
                           closeNewTowerForm={closeNewTower}
                           newTowerinExisting={true}
                        />
                     </AccordionDetails>
                  </Accordion>
               </>
            ) : null}
            <div>
               <Row className="mt-3">
                  <Col lg="3">
                     <ToolTip
                        position="top"
                        style={{ width: "100%" }}
                        name={
                           projectDetails?.builderProjectSearchDto[0]?.status === "REJECTED" ||
                           projectDetails?.builderProjectSearchDto[0]?.status === "ON_HOLD"
                              ? "Cannot add tower beacuse project is either rejected or on hold."
                              : "Add a new Tower or Plotted Unit"
                        }
                     >
                        <Button
                           className="d-flex py-0 mb-2"
                           style={{
                              color: "#BE1452",
                              backgroundColor: "#F8F3F5",
                              borderColor: "#DED6D9",
                           }}
                           disabled={
                              // projectDetails?.builderProjectSearchDto[0]?.status === "UNDER_REVIEW" ||
                              projectDetails?.builderProjectSearchDto[0]?.status === "REJECTED" ||
                              projectDetails?.builderProjectSearchDto[0]?.status === "ON_HOLD"
                                 ? true
                                 : false
                           }
                           onClick={() => {
                              addMoreTower();
                           }} // Bind this function to handle the click
                        >
                           <div
                              style={{
                                 width: "20px",
                                 height: "20px",
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 marginTop: "3vh",
                              }}
                           >
                              <Image
                                 src={addIcon}
                                 style={{ width: "15px", height: "15px", marginTop: "0%" }}
                              />
                           </div>
                           <Text
                              text={"Add More Tower / Plotted "}
                              fontWeight="bold"
                              style={{ fontSize: "12px", color: "#BE1452" }}
                           />
                        </Button>
                     </ToolTip>
                  </Col>
               </Row>
            </div>
            <div className="d-flex justify-content-end">
               <Buttons
                  name="Prieview Project"
                  varient="primary"
                  onClick={() => {
                     setPreviewModal(true);
                  }}
               />
            </div>
         </div>
         <Modal
            show={previewModal}
            onHide={() => {
               setPreviewModal(false);
            }}
            centered
         >
            <Modal.Body className="d-flex justify-content-center">
               <ProjectPreview projectDetails={projectDetails} subProjectList={subProjectList} />
            </Modal.Body>
         </Modal>
         <Modal
            show={rejectModal}
            onHide={() => {
               setRejectModal(false);
            }}
            centered
         >
            <Modal.Body>
               <TextField
                  type="text"
                  label="Rejection Comment"
                  className="textFieldInput w-100"
                  value={rejectionComment}
                  onInput={(e) => {
                     setRejectComment(e.target.value);
                  }}
               />
            </Modal.Body>
            <Modal.Footer>
               <Buttons
                  varient="primary"
                  name="Submit"
                  onClick={() => {
                     changeBuilderProjectStatus("REJECTED", rejectionComment);
                  }}
               />
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ProjectDetailsPage;
