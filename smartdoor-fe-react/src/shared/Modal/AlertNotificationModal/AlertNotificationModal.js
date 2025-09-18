/** @format */

import React, { useCallback, useState } from "react";
import "./AlertNotificationModal.scss";
import { Modal } from "react-bootstrap";
import Text from "../../Text/Text";
import { useEffect } from "react";
import { alertNotification } from "../../../common/redux/actions";
import { formateDateTime } from "../../../common/helpers/Utils";
import { useUserContext } from "../../../common/helpers/Auth";
import { Link } from "react-router-dom";
import ModalModule from "../ModalModule";
import { getUserDetailById } from "../../../common/redux/actions";
import Buttons from "../../Buttons/Buttons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AlertNotificationModal(props) {
   const [allNotifications, setAllNotifications] = useState([]);
   const {
      auth: { userData },
   } = useUserContext();
   const [showUserDetail, setShowUserDetail] = useState(false);
   const [modalData, setModalData] = useState({});
   const [currentPage, setCurrentPage] = useState(1);
   const history = useHistory();

   const closeModal = (data = { isReload: false }) => {
      setShowUserDetail(false);
   };

   const notification = useCallback(
      (pageNo) => {
         alertNotification({ pageNumber: pageNo || 1, pageSize: 50 })
            .then((response) => {
               if (pageNo > 1) {
                  setAllNotifications((prev) => [...prev, ...response.data.resourceData]);
               } else {
                  setAllNotifications(response.data.resourceData);
               }
            })
            .catch((error) => {
               console.log("error", error);
            });
      },
      [userData.userid]
   );

   useEffect(() => {
      notification();
   }, []);
   
   return (
      <div key={`userModal1`}>
         <Modal show={props.show} onHide={props.handleClose} className="slide_modal">
            <div className="modalBg">
               {allNotifications?.map((notification) => (
                  <div className="tabBox">
                     {
                        <div className={`cardSecond ${notification.read ? "read" : ""}`}>
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
                                 text={notification.notificationText}
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
                           {notification?.redirectId !== null ?
                              <>
                                 <Buttons size="small" name="View Property" onClick={() => {history.push("/admin/property/property-details", {propertyId: notification?.redirectId, userId: notification?.userId, menuName: 'Properties'})}} />
                              </>
                              : null}
                        </div>
                     }
                  </div>
               ))}
            </div>
            {allNotifications?.length >= 50 ? (
               <div className="d-inline-block text-center">
                  <Text
                     onClick={() => {
                        setCurrentPage(currentPage + 1);
                        notification(currentPage + 1);
                     }}
                     className="d-inline-block mb-4 showmoreBellicon"
                     alt="show more"
                     fontWeight="mediumbold"
                     color="primaryColor"
                     text={"Show More"}
                  />
               </div>
            ) : null}
         </Modal>
         {showUserDetail ? (
            <ModalModule modalData={modalData} history={{ goBack: closeModal }} />
         ) : null}
      </div>
   );
}

export default AlertNotificationModal;
