/** @format */

import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Buttons from "../Buttons/Buttons";
import Image from "../Image/Image";
import Text from "../Text/Text";
import leftArrow from "../../assets/images/leftarrow-icon.svg";
import edit from "../../assets/images/edit-icon.svg";
import { Col, Row, Modal, Tabs, Tab } from "react-bootstrap";
import "./ModalModule.scss";
import userImage from "../../assets/svg/avatar_big.svg";
import ConfirmationModal from "../../shared/Modal/ConfirmationModal/ConfirmationModal";
import { provideAuth } from "../../common/helpers/Auth"; // ../../../common/helpers/Auth
import filterIcon from "../../assets/images/filter-icon.svg";
import dateIcon from "../../assets/svg/date.svg";

import {
   getAllConvertedLeadsByUser,
   blockTeamMember,
   deactivateTeamMember,
   getAllUsers,
   getUserDetailById,
   getAllExecutionCompletedTask,
   getAllExecutionTask,
   getHelpdeskLeadsByUser,
   getHelpDeskAssignedServiceRequest,
   getTransactionLeadsByUser,
   getTransactionMeetingsByUserId,
   getAllDealsByUserId,
   getSalesTransactionByUser,
} from "../../common/redux/actions";
import { Link, useLocation } from "react-router-dom";

import {
   formateDate,
   showHideEditIcon,
   dateWithFormate,
} from "../../common/helpers/Utils";
import Loader from "../../common/helpers/Loader";
import TAB_ACCORDING_MODULE from "./constants/constants"
import { MapFirstTabElements , MapSecondTabElements , MapThirdTabElements } from "./TabManager";

const ModalModule = (props) => {
   console.log("props:", props);
   const { userData } = provideAuth();
   const routeLocation = useLocation();

  // STATES:
  //   MODAL STATE
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(true);
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [filterModalShow, setfilterModalShow] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [whichModal, setWhichModal] = useState("");

  //state: to handle block and deactivate user
  const [blockData, setBlockData] = useState({});
  const [deactivateUser, setDeactivateUser] = useState({});

  const [showIcon, setShowIcon] = useState(false);

  //state: to handle date picker values for block and filter
  const [datePickerFiltervalue, setDatePickerFiltervalue] = useState([]);
  const [datePickerblockvalue, setDatePickerblockvalue] = useState([]);

  //state: to handle user details
  const [user_Data, setUser_Data] = useState({});

  //state: to handle all tab api's for all modules
  const [dataLeads, setLeadsData] = useState();
  const [dataLeadsCompleted, setLeadsCompletedData] = useState([]);
  const [allTaskData, setAllTaskData] = useState([]);
  const [completedTaskData, setCompletedTaskData] = useState([]);
  const [meetingsData, setMeetingsData] = useState();
  const [dealsData, setDealsData] = useState();
  const [salesTransactionData, setSalesTransactionData] = useState([]);

   let module = useMemo(
      () =>
         props.modalData
            ? props.modalData.module
            : routeLocation.state
            ? routeLocation.state.module
            : "USER",
      [routeLocation,props.modalData]
   );

   const userPosition = useMemo(
      () =>
         props.modalData
            ? props.modalData.userData?.position || ""
            : routeLocation.state?.userData?.position || "",
      [routeLocation,props.modalData]
   );

   const userId = props?.modalData
      ? props?.modalData?.userData?.id || ""
      : routeLocation?.state
      ? routeLocation?.state?.userData.id
      : "";

   let firstTabName = "Tasks";
   let secondTabName = "Completed";
   let thirdTabName = "";

   //  MODAL FUNCTIONS
   const handleModalClose = () => {
      setConfirmationModalShow(false);
      setShowDeactivateModal(false);
      // For Props Rendering 
      if(props.dataFrom) props.history.goBack({isReload : true });
   };
   const handleModalShow = () => setConfirmationModalShow(true);
   const handlefilterModalClose = () => setfilterModalShow(false);
   const handlefilterModalShow = () => setfilterModalShow(true);

   const _getAllConvertedLeadsByUser = useCallback(
      async (startDt = "", endDt = "") => {
         console.log("startDt:", startDt, "endDt:", endDt);
        try{
          const convertedLeadsByUser = await getAllConvertedLeadsByUser({
               userId: userId,
               records: "",
               pageNumber: "",
               fromDate: startDt,
               toDate: endDt,
            });
            const validconvertedLeadsByUser = getValidData(convertedLeadsByUser);
            if(validconvertedLeadsByUser.length){
              // const filterData = validconvertedLeadsByUser.filter(
              //   (data) => data.status !== "COMPLETED"
              // );
              // setCompletedTaskData(filterData);   
              const dataLeadsArray = validconvertedLeadsByUser.filter(
                  (data) => data.status !== "COMPLETED"
                );
                const dataLeadsCompletedArray = validconvertedLeadsByUser.filter(
                  (data) => data.status === "COMPLETED"
                );

                setLeadsData(dataLeadsArray);
                setLeadsCompletedData(dataLeadsCompletedArray);        
            }    

            const salesTransactiondata = await getSalesTransactionByUser({
                  userId: userId,
                  records: 10,
                  pageNumber: 1,
                  fromDate: startDt,
                  toDate: endDt,
               })
            const validsalesTransactiondata = getValidData(salesTransactiondata);
            setSalesTransactionData(validsalesTransactiondata);

        }catch(err){
          console.log("err:", err);
        }

        //  getAllConvertedLeadsByUser({
        //     userId: userId,
        //     records: 10,
        //     pageNumber: 1,
        //     fromDate: startDt,
        //     toDate: endDt,
        //  })
        //     .then((response) => {
        //        if (response.data) {
        //           if (response.data.resourceData) {
        //              const dataLeadsArray = response.data.resourceData.filter(
        //                 (data) => data.status !== "COMPLETED"
        //              );
        //              const dataLeadsCompletedArray = response.data.resourceData.filter(
        //                 (data) => data.status === "COMPLETED"
        //              );

        //              setLeadsData(dataLeadsArray);
        //              setLeadsCompletedData(dataLeadsCompletedArray);
        //           }
        //        }
        //        console.log("responselEAD", response);
        //     })
        //     .catch((error) => {
        //        console.log("error", error);
        //     });
         //getSalesTransactionByUser


        //  getSalesTransactionByUser({
        //     userId: userId,
        //     records: 10,
        //     pageNumber: 1,
        //     fromDate: startDt,
        //     toDate: endDt,
        //  })
        //     .then((response) => {
        //        if (response.data) {
        //           if (response.data.resourceData) {
        //              setSalesTransactionData(response.data.resourceData);
        //           }
        //        }
        //     })
        //     .catch((error) => {
        //        console.log("error", error);
        //     });
      },
      [userId]
   );

   const _getUserDetails = useCallback(async () => {
     try{
       const userDetails = await getUserDetailById({ userId: userId });
       const validUserDetails = getValidData(userDetails);
       if(validUserDetails) setUser_Data(validUserDetails);
     }catch(err){
       console.log(err);
     }
   }, [userId]);

   const _getExecutionTasks = useCallback(
      async (startDt = "", endDt = "") => {
         console.log("startDt:", startDt, "endDt:", endDt);
         try{
          const executionTask = await getAllExecutionTask({ userId: userId, fromDate: startDt, toDate: endDt })  
          const validexecutionTask = getValidData(executionTask);
          // setCompletedTaskData(validexecutionCompletedTask);
          setAllTaskData(validexecutionTask); 
          
          const executionCompletedTask =  await getAllExecutionCompletedTask({ userId: userId, fromDate: startDt, toDate: endDt })
          const validExecutionCompletedTask = getValidData(executionCompletedTask);
          setCompletedTaskData(validExecutionCompletedTask);                   
        }
         catch(err){
           console.log(err)
          }
        //  getAllExecutionCompletedTask({ userId: userId, fromDate: startDt, toDate: endDt }).then(
        //     (response) => {
        //        if (response.data) {
        //           if (response.data.resourceData && response.data.resourceData.length) {
        //              setCompletedTaskData(response.data.resourceData);
        //           } else setCompletedTaskData([]);
        //        }
        //     }
        //  );

        //  getAllExecutionTask({ userId: userId, fromDate: startDt, toDate: endDt }).then(
        //     (response) => {
        //        if (response.data) {
        //           if (response.data.resourceData && response.data.resourceData.length) {
        //              const filterData = response.data.resourceData.filter(
        //                 (data) => data.status !== "COMPLETED"
        //              );
        //              setAllTaskData(filterData);
        //           } else setAllTaskData([]);
        //        }
        //     }
        //  );
      },
      [userId]
   );

   const _getHelpdeskData = useCallback(
      async (startDt = "", endDt = "") => {
      try{
        const helpDeskLeads = await getHelpdeskLeadsByUser({
          userId: userId,
          records: "",
          pageNumber: "",
          fromDate: startDt,
          toDate: endDt,
       });

       const getHelpDeskServiceRequest =  await getHelpDeskAssignedServiceRequest({
        userId: userId,
        records: 10,
        pageNumber: 1,
        fromDate: startDt,
        toDate: endDt,
      });
      const validHelpdeskLeads = getValidData(helpDeskLeads);
      const validHelpdeskServiceRequsests = getValidData(getHelpDeskServiceRequest);
      setLeadsData(validHelpdeskLeads);
      setCompletedTaskData(validHelpdeskServiceRequsests);
      }catch(err){
        console.log(err);
      }
      
        //  getHelpdeskLeadsByUser({
        //     userId: userId,
        //     records: 10,
        //     pageNumber: 1,
        //     fromDate: startDt,
        //     toDate: endDt,
        //  }).then((response) => {
        //     if (response.data) {
        //        if (response.data.resourceData && response.data.resourceData.length) {
        //           setLeadsData(response.data.resourceData);
        //        } else setLeadsData([]);
        //     }
        //  });

        //  getHelpDeskAssignedServiceRequest({
        //     userId: userId,
        //     records: 10,
        //     pageNumber: 1,
        //     fromDate: startDt,
        //     toDate: endDt,
        //  }).then((response) => {
        //     if (response.data) {
        //        if (response.data.resourceData && response.data.resourceData.length) {
        //           setCompletedTaskData(response.data.resourceData);
        //        } else setCompletedTaskData([]);
        //     }
        //  });
      },
      [userId]
   );

   const _getTransactionData = useCallback(
      async (startDt = "", endDt = "") => {
         try {
            const transactionLeadsResult = await getTransactionLeadsByUser({
               userId: userId,
               records: "",
               pageNumber: "",
               fromDate: startDt,
               toDate: endDt,
            });
            const validTransLead = getValidData(transactionLeadsResult);

            const transMeetResult = await getTransactionMeetingsByUserId({
               userId: userId,
               fromDate: startDt,
               toDate: endDt,
            });
            const validMeet = getValidData(transMeetResult);

            const dealsResult = await getAllDealsByUserId({
               userId: userId,
               fromDate: startDt,
               toDate: endDt,
            });

            const validDeals = getValidData(dealsResult);

            // ALL STATES ARE UPDATE
            setLeadsData(validTransLead || []);
            setMeetingsData(validMeet || []);
            setDealsData(validDeals || []);
         } catch (err) {
            console.log("err", err);
         }
      },
      [userId]
   );

   const handleBlockUser = async() => {
      if (userId) {
         let startDt = dateWithFormate(
            datePickerblockvalue.length ? datePickerblockvalue[0] : "",
            "YYYY-MM-DD"
         );
         let endDt = dateWithFormate(
            datePickerblockvalue.length ? datePickerblockvalue[1] : "",
            "YYYY-MM-DD"
         );
         try{
           await blockTeamMember({ userId, startDate: startDt, endDate: endDt })
           await _getUserDetails();
            //   if (module === 'USER') props.getAllUsers();
            if (module === 'USER') props.getAllUsers({pageNumber:"", records:"",searchByCity: props.city, searchByzipCode: props.location, departmentName: props.departments});
           //getAllUsers({pageNumber:"", records:"",searchByCity:city, searchByzipCode:location, departmentName: departments});
           setDatePickerblockvalue([])
         }
         catch(error) {
               console.log(error);
        };
      }
      handleModalClose();
   };
   // for Deactivate user
   const handleDeactivateUser = () => {
      if (userId) {
         // let startDt =  dateWithFormate(datePickerblockvalue.length? datePickerblockvalue[0]:"", "YYYY-MM-DD");
         // let endDt = dateWithFormate(datePickerblockvalue.length? datePickerblockvalue[1]: "", "YYYY-MM-DD")
         let activateDeactivateuser = !user_Data?.active;
         deactivateTeamMember({ userId, activateDeactivateuser: activateDeactivateuser })
            .then((data) => {
               _getUserDetails();
               // if (module === "USER") props.getAllUsers();
               if (module === "USER") props.getAllUsers({pageNumber:"", records:"",searchByCity: props.city, searchByzipCode: props.location, departmentName: props.departments});
            })
            .catch((error) => {
               console.log(error);
            });
      }
      handleModalClose();
   };

   const handlefilterUser = () => {
      if (userId) {
         let startDt = dateWithFormate(
            datePickerFiltervalue.length ? datePickerFiltervalue[0] : "",
            "YYYY-MM-DD"
         );
         let endDt = dateWithFormate(
            datePickerFiltervalue.length ? datePickerFiltervalue[1] : "",
            "YYYY-MM-DD"
         );
         if (module === "SALES") _getAllConvertedLeadsByUser(startDt, endDt);
         if (module === "HELPDESK") _getHelpdeskData(startDt, endDt);
         if (module === "EXECUTION") _getExecutionTasks(startDt, endDt);
         if (module === "TRANSACTION") _getTransactionData(startDt, endDt);
      }
      handlefilterModalClose();
   };

   useEffect(() => {
      (async () => {
         try {
            const result = await getUserDetailById({ userId: userId });
            setUser_Data(result.data.resourceData);
         } catch (err) {
            console.log("err");
         }
      })();
   }, [userId ]); 

   useEffect(() => {
      if (module === "EXECUTION") return _getExecutionTasks();
      else if (module === "SALES") return _getAllConvertedLeadsByUser();
      else if (module === "HELPDESK") return _getHelpdeskData();
      else if (module === "TRANSACTION") return _getTransactionData();
      else return;
   }, [
      _getAllConvertedLeadsByUser,
      module,
      _getExecutionTasks,
      _getHelpdeskData,
      _getTransactionData,
   ]);

   useEffect(() => {
      const showHideIcon = showHideEditIcon(userData.roleName, user_Data?.position);
      console.log("user_Data?.position:", user_Data?.position);
      setShowIcon(showHideIcon);
   }, [user_Data?.position,userData.roleName]);

   if (user_Data && !Object.keys(user_Data).length) return <></>;
   // Module For Trnsaction WITH INITIAL STATE AS UNDEFINED

   const tab_Names = TAB_ACCORDING_MODULE?.[module];

   if (tab_Names) {
      firstTabName = tab_Names.firstTabName;
      secondTabName = tab_Names.secondTabName;
      thirdTabName = tab_Names.thirdTabName;
   } else {
      const tab_acc_userPos = TAB_ACCORDING_MODULE?.[userPosition];
      firstTabName = tab_acc_userPos?.firstTabName;
      secondTabName = tab_acc_userPos?.secondTabName;
      thirdTabName = tab_acc_userPos?.thirdTabName;
   }

   return (
      <div key={`userModal1`}>
         <Modal show={show} onHide={handleClose} className="slide_modal">
            <div className="modalBg">
               {module === "TRANSACTION" &&
               (dataLeads === undefined ||
                  meetingsData === undefined ||
                  dealsData === undefined) ? (
                  <div>
                     <Loader />
                  </div>
               ) : (
                  <>
                     <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center leftIcon">
                           <Buttons
                              iconSrc={leftArrow}
                              onClick={() => props.history.goBack()}
                              name="Back"
                              type="submit"
                              size="body"
                              color="secondryColor"
                           />
                        </div>
                        {userId ? (
                           <div className="d-flex align-items-center modalRight">
                              {
                                 showIcon ? (
                                    <Link
                                       to={{
                                          pathname: "/admin/user-management/edit-member",
                                          state: { user_Data },
                                       }}
                                    >

                                       <Buttons
                                          iconSrc={edit}
                                          name="Edit"
                                          varient="secondary"
                                          type="submit"
                                          size="Small"
                                          color="secondaryColor"
                                       />
                                    </Link>
                                 ) : (
                                    ""
                                 )
                              }
                              <Buttons
                                 name={user_Data?.blocked ? "Unblock" : "Block"}
                                 varient="primary"
                                 type="submit"
                                 size="Small"
                                 color="white"
                                 onClick={() => {
                                    setWhichModal("block");
                                    setShowDeactivateModal(false);
                                    handleModalShow();
                                    setBlockData({ id: userId, isBlocked: user_Data?.blocked });
                                 }}
                              />
                              <Buttons
                                 name={user_Data?.active ? "Deactivate" : "Activate"}
                                 varient="primary"
                                 type="submit"
                                 size="Small"
                                 color="white"
                                 onClick={() => {
                                    setWhichModal("deactivate");
                                    setConfirmationModalShow(false);
                                    setShowDeactivateModal(true);
                                    handleModalShow();
                                    setDeactivateUser({
                                       id: userId,
                                       deactivateUser: user_Data?.active,
                                    });
                                 }}
                              />
                           </div>
                        ) : null}
                     </div>
                     <div className="profileDetails pl-20 mt-4 mb-4">
                        <Row>
                           <Col lg={6}>
                              <div className="userDetails d-flex align-items-center">
                                 <Image name="profile" src={user_Data?.imageUrl || userImage} />
                                 <div className="pl-3">
                                    <Text
                                       size="regular"
                                       fontWeight="smbold"
                                       color="secondryColor"
                                       text={user_Data?.name ? user_Data?.name.capitalizeWord() : "-"}
                                    />
                                    <Text
                                       size="xSmall"
                                       fontWeight="smbold"
                                       color="TaupeGrey"
                                       text={user_Data?.position || "-"}
                                    />
                                    <Text
                                       size="xSmall"
                                       fontWeight="smbold"
                                       color="secondryColor"
                                       text={`Joined on: ${
                                          user_Data?.joiningDate
                                             ? formateDate(user_Data?.joiningDate)
                                             : "-"
                                       }`}
                                       className="pt-2"
                                    />
                                    {user_Data?.blocked ? (
                                       <>
                                          <Text
                                             size="xSmall"
                                             fontWeight="smbold"
                                             color="secondryColor"
                                             text={`unavailability`}
                                             className="pt-2 mb-1"
                                          />
                                          <div className="d-flex">
                                             <img
                                                src={dateIcon}
                                                alt="unavailaiblity date"
                                                className="mr-2"
                                             />
                                             <Text
                                                size="xSmall"
                                                fontWeight="smbold"
                                                color="TaupeGrey"
                                                text={"From:"}
                                                className="mr-2"
                                             />
                                             <Text
                                                size="xSmall"
                                                className="mr-2"
                                                fontWeight="smbold"
                                                color=""
                                                text={dateWithFormate(
                                                   user_Data?.blockStartDate !== null
                                                      ? user_Data?.blockStartDate
                                                      : "",
                                                   "MMM DD, YYYY"
                                                )}
                                             />
                                             <Text
                                                size="xSmall"
                                                className="mr-2"
                                                fontWeight="smbold"
                                                color="TaupeGrey"
                                                text={"To:"}
                                             />
                                             <Text
                                                size="xSmall"
                                                fontWeight="smbold"
                                                color=""
                                                text={dateWithFormate(
                                                   user_Data?.blockEndDate !== null
                                                      ? user_Data?.blockEndDate
                                                      : "",
                                                   "MMM DD, YYYY"
                                                )}
                                             />
                                          </div>
                                       </>
                                    ) : null}
                                    {/* // <Text size="xSmall" fontWeight="smbold" color="secondryColor" text={ `unavailability` } className="pt-2 mb-1" />
                    // <div className="d-flex">
                    //   <img src ={dateIcon} alt="unavailaiblity date" className="mr-2" /> 
                    //   <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ 'From:' } className="mr-2" />
                    //   <Text size="xSmall" className="mr-2" fontWeight="smbold" color="" text={ '24 Jan, 2022' } />
                    //   <Text size="xSmall" className="mr-2" fontWeight="smbold" color="TaupeGrey" text={ 'To:' } />
                    //   <Text size="xSmall" fontWeight="smbold" color="" text={ '24 Jan, 2022' } />
                    // </div> */}
                                 </div>
                              </div>
                           </Col>
                           <Col lg={6}>
                              <div className="personalDetail">
                                 <div className="d-flex align-items-center  justify-content-between">
                                    <Text
                                       size="Small"
                                       fontWeight="smbold"
                                       color="secondryColor"
                                       text="Location"
                                    />
                                    <Text
                                       className="cursor-pointer elipsis-text"
                                       title={user_Data?.city.map(cityName => cityName)}
                                       size="Small"
                                       fontWeight="mediumbold"
                                       color="secondryColor"
                                       text={user_Data?.city.map(cityName => cityName)}
                                    />
                                 </div>
                                 <div className="d-flex align-items-center  justify-content-between pt-2">
                                    <Text
                                       size="Small"
                                       fontWeight="smbold"
                                       color="secondryColor"
                                       text="Date of Birth"
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="mediumbold"
                                       color="secondryColor"
                                       text={user_Data?.dob ? formateDate(user_Data?.dob) : "-"}
                                    />
                                 </div>
                                 <div className="d-flex align-items-center  justify-content-between pt-2">
                                    <Text
                                       size="Small"
                                       fontWeight="smbold"
                                       color="secondryColor"
                                       text="Phone Number"
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="mediumbold"
                                       color="secondryColor"
                                       text={user_Data?.contactNumber || "-"}
                                    />
                                 </div>
                                 <div className="d-flex align-items-center  justify-content-between pt-2">
                                    <Text
                                       size="Small"
                                       fontWeight="smbold"
                                       color="secondryColor"
                                       text="Email"
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="mediumbold"
                                       color="secondryColor"
                                       text={user_Data?.email || "-"}
                                    />
                                 </div>
                              </div>
                           </Col>
                        </Row>
                     </div>
                     <div className="tabBox">
                        <Tabs defaultActiveKey="first" id="uncontrolled-tab-example">
                           <Tab eventKey="first" title={firstTabName}>
                              <MapFirstTabElements
                                 module={module}
                                 dataLeads={dataLeads}
                                 allTaskData={allTaskData}
                              />
                           </Tab>
                           <Tab eventKey="second" title={secondTabName}>
                              <MapSecondTabElements
                                 module={module}
                                 dataLeadsCompleted={dataLeadsCompleted}
                                 completedTaskData={completedTaskData}
                                 meetingsData={meetingsData}
                              />
                           </Tab>
                           <Tab eventKey="third" title={thirdTabName}>
                              <MapThirdTabElements
                                 module={module}
                                 salesTransactionData={salesTransactionData}
                                 dealsData={dealsData}
                              />
                           </Tab>
                        </Tabs>

                        <div className="dateFilter">
                           <Buttons
                              name="Filter"
                              varient="secondary"
                              type="submit"
                              size="Small"
                              color="secondaryColor"
                              iconSrc={filterIcon}
                              className= "mr-2 font-weight-bold filterButton"
                              onClick={() => {
                                 setWhichModal("filter")
                                 handlefilterModalShow()
                              }}
                           />
                        </div>
                     </div>
                  </>
               )}
            </div>
         </Modal>

         {/* FOR BLOCK FUNCTIONALITY */}
         {whichModal === "block" ? (
            <>
               <ConfirmationModal
                  title={
                     blockData.isBlocked
                        ? "Are you sure you want to unblock this user?"
                        : "Are you sure you want to block this user?"
                  }
                  cancelButtonName="Cancel"
                  primaryButtonName={blockData.isBlocked ? "Unblock" : "Block"}
                  show={confirmationModalShow}
                  handleClose={handleModalClose}
                  handleShow={handleModalShow}
                  handlePerformAction={handleBlockUser}
                  showDateRange={blockData.isBlocked ? false : true}
                  // dates = { dates}
                  // setDates = { setDates }
                  submodule={"block"}
                  datePickerblockvalue={datePickerblockvalue}
                  setDatePickerblockvalue={setDatePickerblockvalue}
                  whichModal={whichModal}
               />
            </>
         ) : null}

         {/* FOR FILTER FUNCTIONALITY */}
         <ConfirmationModal
            title={"Select Date range"}
            cancelButtonName="Cancel"
            primaryButtonName={"Apply"}
            show={filterModalShow}
            handleClose={handlefilterModalClose}
            handleShow={handlefilterModalShow}
            handlePerformAction={handlefilterUser}
            showDateRange={true}
            // dates = { dates}
            // setDates = { setDates }
            datePickerFiltervalue={datePickerFiltervalue}
            setDatePickerFiltervalue={setDatePickerFiltervalue}
            // filterDates = { filterDates }
            // setFilterDates = { setFilterDates }
            submodule={"filter"}
            whichModal={whichModal}
         />

         {whichModal === "deactivate" ? (
            <>
               {/* for deactivate user */}
               <ConfirmationModal
                  title={
                     user_Data?.active
                        ? "Are you sure you want to deactivate this user?"
                        : "Are you sure you want to activate this user?"
                  }
                  cancelButtonName="Cancel"
                  primaryButtonName={user_Data?.active ? "Deactivate" : "Activate"}
                  show={confirmationModalShow}
                  handleClose={handleModalClose}
                  handleShow={handleModalShow}
                  handlePerformAction={handleDeactivateUser}
                  // showDateRange={blockData.isBlocked ? false : true}
                  showDateRange={false}
                  // dates = { dates}
                  // setDates = { setDates }
                  submodule={"deactivate"}
                  showDeactivateModal={showDeactivateModal}
                  // datePickerblockvalue={datePickerblockvalue}
                  // setDatePickerblockvalue={setDatePickerblockvalue}
                  whichModal={whichModal}
               />
            </>
         ) : null}
      </div>
   );
};

const getValidData = (api_data) => {
   return api_data.data?.resourceData && (!!Object.keys(api_data.data?.resourceData).length && api_data.data?.resourceData);
};

const actions = {
   getAllUsers,
};

const withConnect = connect(null, actions);

export default compose(withConnect, memo)(ModalModule);

// GARBAGE
/**
 *  if (["Help Desk Executive", "Help Desk Admin"].includes(userPosition)) {
         module = "HELPDESK";
         firstTabName = "Leads";
         secondTabName = "Service Requests";
      }
      if (["Installation Executive", "Execution Admin"].includes(userPosition)) {
         module = "EXECUTION";
         firstTabName = "Tasks";
         secondTabName = "Completed";
      }
      if (["Sales Executive", "Sales Admin"].includes(userPosition)) {
         module = "SALES";
         firstTabName = "Leads";
         secondTabName = "completed";
      }
      if (["Transaction Executive", "Transaction Admin"].includes(userPosition)) {
         module = "TRANSACTION";
         firstTabName = "Visit Leads";
         secondTabName = "Deal Meetings";
         thirdTabName = "Total Transactions";
      }
 */
