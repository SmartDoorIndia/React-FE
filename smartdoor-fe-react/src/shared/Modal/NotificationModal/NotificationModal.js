import React, { useCallback, useState } from 'react'
import "./NotificationModal.scss";
import { Modal } from "react-bootstrap";
import Text from '../../Text/Text';
import { useEffect } from 'react';
import { allNotification } from '../../../common/redux/actions'
import { formateDateTime } from '../../../common/helpers/Utils';
import { useUserContext } from '../../../common/helpers/Auth';
import { Link } from 'react-router-dom';
import ModalModule from '../ModalModule';
import { getUserDetailById } from '../../../common/redux/actions'

function NotificationModal(props) {
   const [allNotifications, setAllNotifications] = useState([]);
   const [totalRecords, setTotalRecords] = useState(0)
   const [noOfrecords, setNoOfRecords] = useState(50)
   const { auth: { userData } } = useUserContext();
   const [showUserDetail, setShowUserDetail] = useState(false)
   const [userDetailId, setUseDetailId] = useState('')
   const [modalData, setModalData] = useState({})
   const [propertyId, setPropertyId] = useState('')

   const closeModal = (data = { isReload: false }) => {
      // if(data?.isReload) {
      //    getAllUsers({pageNumber:"", records:"",searchByCity:city, searchByzipCode:location, departmentName: departments});
      // }
      // getAllUsers({pageNumber:"", records:"",searchByCity:"", searchByzipCode:""});
      setShowUserDetail(false)
      // setModalData();
   };

   const notification = useCallback(() => {

      allNotification({ userId: userData.userid })
         .then((response) => {
            setAllNotifications(response.data.resourceData)
            setTotalRecords(response.data.records)
         })
         .catch((error) => {
            console.log('error', error)
         })
   }, [userData.userid]);

   const _getUserDetails = useCallback(async (userId) => {
      console.log(userId, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      setShowUserDetail(true);
      try {
         const userDetails = await getUserDetailById({ userId });
         const updatedModalData = { userData: userDetails.data.resourceData }
         setModalData(updatedModalData)
         console.log(userDetails.data.resourceData, "sssssssssssssssssssssssssss");
         //   const validUserDetails = getValidData(userDetails);
         //   if(validUserDetails) setUser_Data(validUserDetails);
      } catch (err) {
         console.log(err);
      }
   }, [userDetailId]);

   const redirectingProperty = useCallback((propId) => {
      setPropertyId({ propertyId: propId })
      console.log(propertyId, "pppppppppppppppppppppppppppppppp");
      props.handleClose()

      // allNotification({ userId: userData.userid })
      //    .then((response) => {
      //       setAllNotifications(response.data.resourceData)
      //       setTotalRecords(response.data.records)
      //    })
      //    .catch((error) => {
      //       console.log('error', error)
      //    })
   }, [propertyId]);


   useEffect(() => {
      notification()

   }, [])
   return (
      <div key={`userModal1`}>
         <Modal show={props.show} onHide={props.handleClose} className="slide_modal">
            <div className="modalBg">
               {totalRecords === 0 ?
                  <>
                     <Text
                        size="regular"
                        fontWeight="smbold"
                        color="secondryColor"
                        text={"No Notification"}
                     />
                  </>
                  : null}
               {allNotifications?.slice(0, noOfrecords).map(notification =>
                  <div className='tabBox'>
                     {
                        notification.propertyId ?
                           (
                              <Link
                                 className='removeUnderline'
                                 to={{
                                    pathname: '/admin/property/property-details',
                                    state: {
                                       propertyId: notification.propertyId,
                                       userId: userData.userid
                                    },
                                 }}
                              >
                                 <div onClick={() => redirectingProperty(notification.propertyId)} className="cardSecond" >
                                    <Text
                                       size="regular"
                                       fontWeight="smbold"
                                       color="secondryColor"
                                       text={notification.notificationTitle}
                                    />
                                    <div className="d-flex align-items-center pt-2">
                                       <Text
                                          size="xSmall"
                                          fontWeight="smbold"
                                          color="TaupeGrey"
                                          text={notification.notification}
                                          className="mr-3"
                                       />
                                    </div>
                                    <Text
                                       size="xSmall"
                                       fontWeight="smbold"
                                       color="TaupeGrey"
                                       text={formateDateTime(notification.dateTime)}
                                       className="mr-3"
                                    />
                                 </div>
                              </Link>
                           )
                           : notification.userId ?
                              (
                                 <div onClick={() => _getUserDetails(notification.userId)} className="cardSecond notifications" >
                                    <Text
                                       size="regular"
                                       fontWeight="smbold"
                                       color="secondryColor"
                                       text={notification.notificationTitle}
                                    />
                                    <div className="d-flex align-items-center pt-2">
                                       <Text
                                          size="xSmall"
                                          fontWeight="smbold"
                                          color="TaupeGrey"
                                          text={notification.notification}
                                          className="mr-3"
                                       />
                                    </div>
                                    <Text
                                       size="xSmall"
                                       fontWeight="smbold"
                                       color="TaupeGrey"
                                       text={formateDateTime(notification.dateTime)}
                                       className="mr-3"
                                    />
                                 </div>
                              )
                              : notification.ticketCloseId ?
                                 (
                                    <Link className='removeUnderline' to={{ pathname: notification.moduleName === 'EXECUTION' ? `/admin/execution/serviceRequest-details/${notification.ticketCloseId}` : `/admin/helpdesk/serviceRequest-details/${notification.ticketCloseId}` }}
                                       onClick={props.handleClose}
                                    >

                                       <div className="cardSecond" >
                                          <Text
                                             size="regular"
                                             fontWeight="smbold"
                                             color="secondryColor"
                                             text={notification.notificationTitle}
                                          />
                                          <div className="d-flex align-items-center pt-2">
                                             <Text
                                                size="xSmall"
                                                fontWeight="smbold"
                                                color="TaupeGrey"
                                                text={notification.notification}
                                                className="mr-3"
                                             />
                                          </div>
                                          <Text
                                             size="xSmall"
                                             fontWeight="smbold"
                                             color="TaupeGrey"
                                             text={formateDateTime(notification.dateTime)}
                                             className="mr-3"
                                          />
                                       </div>
                                    </Link>
                                 )
                                 : notification.societyEnrollId ?
                                    (
                                       <Link className='removeUnderline' to={{
                                          pathname: '/admin/sales/lead-details',
                                          state: { leadId: notification.societyEnrollId },
                                       }}
                                          onClick={props.handleClose}
                                       >
                                          <div className="cardSecond" >
                                             <Text
                                                size="regular"
                                                fontWeight="smbold"
                                                color="secondryColor"
                                                text={notification.notificationTitle}
                                             />
                                             <div className="d-flex align-items-center pt-2">
                                                <Text
                                                   size="xSmall"
                                                   fontWeight="smbold"
                                                   color="TaupeGrey"
                                                   text={notification.notification}
                                                   className="mr-3"
                                                />
                                             </div>
                                             <Text
                                                size="xSmall"
                                                fontWeight="smbold"
                                                color="TaupeGrey"
                                                text={formateDateTime(notification.dateTime)}
                                                className="mr-3"
                                             />
                                          </div>
                                       </Link>
                                    )
                                    : notification.installationPendingId ?
                                       (
                                          <Link className='removeUnderline' to={{
                                             pathname: "/admin/execution/installation-detail",
                                             state: { taskId: notification.installationPendingId }
                                          }}
                                             onClick={props.handleClose}
                                          >
                                             <div className="cardSecond" >
                                                <Text
                                                   size="regular"
                                                   fontWeight="smbold"
                                                   color="secondryColor"
                                                   text={notification.notificationTitle}
                                                />
                                                <div className="d-flex align-items-center pt-2">
                                                   <Text
                                                      size="xSmall"
                                                      fontWeight="smbold"
                                                      color="TaupeGrey"
                                                      text={notification.notification}
                                                      className="mr-3"
                                                   />
                                                </div>
                                                <Text
                                                   size="xSmall"
                                                   fontWeight="smbold"
                                                   color="TaupeGrey"
                                                   text={formateDateTime(notification.dateTime)}
                                                   className="mr-3"
                                                />
                                             </div>
                                          </Link>
                                       )
                                       : notification.notifictionAction==="ASSIGN_SLOT" ?
                                       (
                                          <Link className='removeUnderline' to={{
                                             pathname: "/admin/execution/installation-detail",
                                             state: { taskId: notification.redirectId }
                                          }}
                                             onClick={props.handleClose}
                                          >
                                             <div className="cardSecond" >
                                                <Text
                                                   size="regular"
                                                   fontWeight="smbold"
                                                   color="secondryColor"
                                                   text={notification.notificationTitle}
                                                />
                                                <div className="d-flex align-items-center pt-2">
                                                   <Text
                                                      size="xSmall"
                                                      fontWeight="smbold"
                                                      color="TaupeGrey"
                                                      text={notification.notification}
                                                      className="mr-3"
                                                   />
                                                </div>
                                                <Text
                                                   size="xSmall"
                                                   fontWeight="smbold"
                                                   color="TaupeGrey"
                                                   text={formateDateTime(notification.dateTime)}
                                                   className="mr-3"
                                                />
                                             </div>
                                          </Link>
                                       )
                                       :
                                       (
                                          <div className="cardSecond" >
                                             <Text
                                                size="regular"
                                                fontWeight="smbold"
                                                color="secondryColor"
                                                text={notification.notificationTitle}
                                             />
                                             <div className="d-flex align-items-center pt-2">
                                                <Text
                                                   size="xSmall"
                                                   fontWeight="smbold"
                                                   color="TaupeGrey"
                                                   text={notification.notification}
                                                   className="mr-3"
                                                />
                                             </div>
                                             <Text
                                                size="xSmall"
                                                fontWeight="smbold"
                                                color="TaupeGrey"
                                                text={formateDateTime(notification.dateTime)}
                                                className="mr-3"
                                             />
                                          </div>
                                       )}
                  </div>
               )}
            </div>
            {(totalRecords > noOfrecords) ?
               <div className='d-inline-block text-center'>
                  <Text onClick={() => setNoOfRecords(noOfrecords + 50)} className='d-inline-block mb-4 showmoreBellicon' alt="show more" fontWeight="mediumbold" color="primaryColor" text={'Show More'} />
               </div>
               : null}
         </Modal>
         {showUserDetail ?
            <ModalModule
               modalData={modalData}
               history={{ goBack: closeModal }}
            />
            : null}
      </div>
   )
}

export default NotificationModal