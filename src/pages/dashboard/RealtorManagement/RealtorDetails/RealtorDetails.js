import React, { useState, useEffect, useCallback } from 'react';
import Image from '../../../../shared/Image/Image';
import Text from '../../../../shared/Text/Text';
import './RealtorDetails.scss';
import { getRealtorDetails, toggleRealtorAdvisorStatus, getRealtorPropertyList } from '../../../../common/redux/actions';
import Buttons from '../../../../shared/Buttons/Buttons';
import { Link, useParams } from 'react-router-dom';
import userImage from '../../../../assets/svg/avatar_big.svg';
import StarRating from '../../../../shared/StarRating/StarRating';
import userImageAvatar from '../../../../assets/svg/avatar_sml.svg';
import Loader, { TableLoader } from '../../../../common/helpers/Loader';
import { formateDate, formateDateTime, handleStatusElement, ToolTip } from '../../../../common/helpers/Utils';
import ConfirmationModal from '../../../../shared/Modal/ConfirmationModal/ConfirmationModal';
import { useUserContext } from '../../../../common/helpers/Auth';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import MessageModal from '../../../../shared/Modal/MessageModal/MessageModal';
import contentIco from '../../../../assets/images/content-ico.svg';


const RealtorDetails = (props) => {

//   function formateAddress(address, city) {
//     try {
//        if (address) {
//           const splitData = address.split(", ");
//           if (splitData.length) {
//              try {
//                 let addr;
//                 let sliceData = splitData.slice(0, 2);
//                 sliceData = sliceData.map((item) => item.toLowerCase());
//                 sliceData = sliceData.filter((item) => item !== city.toLowerCase());
//                 sliceData = sliceData.map((item) => item.capitalize());
//                 addr = sliceData.join(',');
//                 return addr + ", " + city || "";
//              } catch (e) {
//                 return address + ", " + city || "";
//              }
//           } else {
//              return address + ", " + city || "";
//           }
//        } else {
//           return city || "-";
//        }
//     } catch (e) {
//        return "-";
//     }
//  }
  const [declineModal, setDeclineModal] = useState(false)
  const [loading, setLoading] = useState(true);
  const [realtorData, setRealtorData] = useState({})
  // const [ isApproved , setIsApproved] = useState(props.location.state ? props.location.state.status ==="ACCEPTED"? true: false : '')
  const [advsiorStatus, setAdvsiorStatus] = useState(props.location.state ? props.location.state.status : '')
  // const [isBlocked, setIsBlocked] = useState(props.location.state ? props.location.state.status : '');
  const advisor = useParams();

  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [blockData, setBlockData] = useState({});
  const handleModalClose = () => setConfirmationModalShow(false);
  const handleModalShow = () => setConfirmationModalShow(true);
  const [realtorProperty , setRealtorProperty] = useState([]);

  const _getRealtorDetails = useCallback(() => {
    getRealtorDetails({ advisorId: advisor.advisorId })
      .then((response) => {
        setLoading(false);
        console.log(advisor,"addddddddddddddddddd")
        if (response.data) {
          if (response.data.resourceData) {
            setRealtorData(response.data.resourceData);
            getRealtorPropertyList({ ownerId: response.data.resourceData.userId, records:"", pageNumber:"",source:"web" })
            .then((result)=>{
              console.log("result is:", result);
              if(result.data && result.status === 200) setRealtorProperty(result.data.resourceData);
            })
            .catch(err=> console.log(err));
            // setRealtorProperty(response.data.resourceData.propertyResponse);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
      })
  }, [getRealtorDetails])

  const { auth: { userData } } = useUserContext();

//   const PaginationActionButton = () => (
//     <div className="d-flex justify-content-between tableBottom">
//        <span></span>
//        <Link to="/admin/user-management/add-new-member">
//           <Buttons name="Add New Entry" varient="success" type="submit" size="Small" color="white" />
//        </Link>
//     </div>
//  );

//   const PaginationComponent = (props) => (
//     <Pagination {...props} PaginationActionButton={PaginationActionButton} />
//  );

 const ProgressComponent = <TableLoader />;


  useEffect(() => {
    _getRealtorDetails();
  }, [_getRealtorDetails,])

  const columns = [
    {
       name: "Id",
       selector: "smartdoorPropertyId",
       sortable: true,
       center: true,
    },
    {
      name: "Posted On",
      selector: "addedOn",
      sortable: true,
      center: true,
      minWidth: '120px',
      // style: { padding: "0 !important" },
      cell: ({ addedOn }) => <span>{`${formateDate(addedOn)}` || ""}</span>,
      // cell:({addedOn})=>(<span>{`${propertyInfoResponse.propertySubType}`}</span>)
      // {`${new Date(Date.parse(addedOn)).toDateString()}`||""}
   },
    {
       name: "Location",
       sortable: false,
       wrap: true,
      //  style: { padding: "0 !important" },
       center: true,
       cell: ({ societyDetailResponse, city }) => (
          <ToolTip
             position="top"
             style={{ width: "100%" }}
             name={ (societyDetailResponse.locality || '') + ', ' + (city || '') }>
        <span className="cursor-pointer elipsis-text"> {societyDetailResponse.locality.substring(
                     0,
                     societyDetailResponse.locality.indexOf(",") !== -1 ? societyDetailResponse.locality.indexOf(",") : societyDetailResponse.locality.length)}</span>
      </ToolTip>
       ),
    },
    {
       name: "Type",
       selector: "propertySubType",
       sortable: false,
       center: true,
       minWidth: '110px',
      //  style: { padding: "0 !important" },
       // ${propertyInfoResponse.propertySubType}||"-"
       cell: ({ propertySubType }) => (
          <span className="text-align-center">{propertySubType || "-"}</span>
       ),
    },
    {
      name: 'For',
      selector: (row) => row.propertyCategory,
      sortable: false,
      center: true,
      // maxWidth: '150px',
      // style: { 'text-align': 'center' },
      cell: ({ propertyCategory }) => <span>{propertyCategory==="Lease" ? 'Rent' : 'Sale'}</span>,
    },
    {
      name: 'User Visited',
      selector: "userVisited",
      sortable: false,
      center: true,
      minWidth: '120px',
      // style: { 'text-align': 'center' },
      cell: ({ userVisited }) => <span>{userVisited} </span>,
    },
    {
      name: 'Meetings Done',
      selector: (row) => row.meetingDone,
      sortable: false,
      center: true,
      minWidth: '140px',
      // style: { 'text-align': 'center' },
      cell: ({ meetingDone }) => <span>{meetingDone }</span>,
    },
    {
       name: "Information",
       selector: "propertyInfoResponse",
       sortable: false,
       center: true,
       minWidth: '200px',
      //  style: { padding: "0 !important" },
       cell: (row) => (
          <span>{`${row.carpetArea + " Sq. Ft. | " || ""}${(row.bedRooms ? row.bedRooms : "0") + " Bed | " || ""} ${
            (row.numberOfBath ? row.numberOfBath : "0") + " Bath" || "-"
          }`}</span>
       ),
    },
    {
       name: "Action",
       selector: "year",
       sortable: false,
       center: true,
      //  maxWidth: '60px',
       cell: ({ row, smartdoorPropertyId }) =>( <div className="action">
       <ToolTip position="left" name="View Details">
         <span>
           <Link to={ { pathname: '/admin/realtor-advisor-management/advisor-details/property-details',
             state: { propertyId: smartdoorPropertyId,
               userId: userData.userid },
           } }>
             <Image name="editIcon" src={ contentIco } />
           </Link>
         </span>
       </ToolTip>
       {/* <span>
                       <Link  >
                         <Image name="useraddIcon" src={cancleIco} />
                       </Link>
                       </span> */}
     </div>
     ),
    },
 ];

 const declineRealtor = useCallback((message) => {
  console.log(message,"decline realtor")
  handleRealtorStatus(advisor.advisorId, "REJECTED", message)
  setDeclineModal(false)
 },[])

  // const handleBlockUser = () => {
  //   // if (userId) {
  //   //   blockTeamMember({ userId })
  //   //       .then((data)=>{
  //   //         _getUserDetails();
  //   //         if (module === 'USER') props.getAllUsers();
  //   //       })
  //   //       .catch((error)=>{
  //   //         console.log(error)
  //   //       })
  //   // }
  //   // handleModalClose();
  // }
  const declineModalhandleModalClose = () => {
    setDeclineModal(false)
  }


  const handleRealtorStatus = (advisorId, status, message) => {
    toggleRealtorAdvisorStatus({ advisorId, status, userId:Number(userData.userid),message  
       })
      .then((res) => {
        console.log("realtor details: data:", res?.data?.resourceData?.status);
        setAdvsiorStatus(res?.data?.resourceData?.status)
        // setIsApproved(true);
        // set
        _getRealtorDetails();
      })
      .catch((error) => {
        console.log('')
      })
    handleModalClose();
  }

  return (
    <>
      <ConfirmationModal
        // title ={ blockData.isBlocked?'Are you sure you want to unblock this user?':'Are you sure you want to block this user?' }
        title={realtorData.blocked ? 'Are you sure you want to unblock this user?' : 'Are you sure you want to block this user?'}
        cancelButtonName="Cancel"
        primaryButtonName={realtorData.blocked ? 'Unblock' : 'Block'}
        show={confirmationModalShow}
        handleClose={handleModalClose}
        handleShow={handleModalShow}
        handlePerformAction={() => handleRealtorStatus(advisor.advisorId, realtorData.blocked ? "UNBLOCKED" : "BLOCKED")}
      />
      {/* <ConfirmationModal
        // title ={ blockData.isBlocked?'Are you sure you want to unblock this user?':'Are you sure you want to block this user?' }
        title={realtorData.blocked ? 'Are you sure you want to unblock this user?' : 'Are you sure you want to block this user?'}
        cancelButtonName="Cancel"
        primaryButtonName={realtorData.blocked ? 'Unblock' : 'Block'}
        show={declineModal}
        handleClose={declineModalhandleModalClose}
        handleShow={true}
        handlePerformAction={() => handleRealtorStatus(advisor.advisorId, realtorData.blocked ? "UNBLOCKED" : "BLOCKED")}
      /> */}

          <MessageModal
            show={declineModal}
            // handleShow={handleshowMsgModal}
            handleClose={declineModalhandleModalClose}
            declineRealtor={declineRealtor}
            modulename={"realtor"}
            headerText="Are you sure you want to decline ?"
            subHeaderText="Comment"
            // ownerId={ownerId}
            // userId={userId}
          />

      {loading ? <Loader /> :
        <>
          <div className="buttonTopSection">
            <div></div>
            <div className="d-flex">
              {realtorData.status==="SUBMITTED" ? 
              <>
                <Buttons
                  name = "Approve"
                  type="submit"
                  size="Small"
                  color="primary"
                  className="w-100 float-right  mr-2"
                  onClick={() => {
                    // if (advsiorStatus === "ACCEPTED") {
                    //   return false;
                    // } else {
                      handleRealtorStatus(advisor.advisorId, "ACCEPTED")
                    // }
                  }}
                />
                <Buttons
                  name = "Decline"
                  type="submit"
                  size="Small"
                  color="primary"
                  className="w-100 float-right borderrad25 mr-2"
                  onClick = {()=>{setDeclineModal(true)}}
                  // onClick={() => {
                  //   // if (advsiorStatus === "ACCEPTED") {
                  //   //   return false;
                  //   // } else {
                  //     handleRealtorStatus(advisor.advisorId, "REJECTED")
                  //   // }
                  // }}
                />
                </>

                : 
                ""
                // <div className="d-flex align-items-center status">
                //       {/* <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={`${data?.houseNumber}, ${data?.towerName !== null ? `${data?.towerName},` : ''} ${data?.societyName}`} className="mr-2" /> */}
                //       {realtorData?.status ? handleStatusElement(realtorData?.status) : ''}
                // </div>
              }


              {realtorData.status==="ACCEPTED" ?
                <Buttons
                name={realtorData.blocked ? 'Unblock' : 'Block'}
                type="submit"
                size="Small"
                color="primary"
                className="w-100 float-right borderrad25"
                onClick={() => {
                  handleModalShow()
                  setBlockData({ id: advisor.advisorId, status: advsiorStatus })
                }
                }
              />
            : null}
            </div>
          </div>
          <div className="whiteBg mb-0">

            <div className='realtorDetails'>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className='userImage'>
                    <Image
                      name="consumerIcon"
                      //realtorDetailsData?.callBackResponse[0].profileImageUrl? realtorDetailsData?.callBackResponse[0].profileImageUrl :
                      src={realtorData?.profileImageUrl ? realtorData?.profileImageUrl : userImage}
                      className="img-fluid"
                    />

                  </div>
                  <div>
                    {/* //realtorDetailsData?.callBackResponse[0].name || "-" */}
                    <div className='d-flex align-items-baseline'>
                      <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={realtorData?.name || "-"} className="mt-1" />
                      <div className='status pl-2'>
                      <div className="d-flex align-items-center status">
                      {/* <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={`${data?.houseNumber}, ${data?.towerName !== null ? `${data?.towerName},` : ''} ${data?.societyName}`} className="mr-2" /> */}
                      {realtorData?.status ? handleStatusElement(realtorData?.status) : ''}
                      </div>
                      </div>
                    </div>
                    <Text size="body" fontWeight="semibold" color="secondryColor" text={realtorData?.emailId !==null ? realtorData?.emailId :  ""} className="mt-1" />
                    <Text size="body" fontWeight="semibold" color="secondryColor" text={realtorData?.mobile || ""} className="mt-1" />
                    <Text size="body" fontWeight="semibold" color="secondryColor" text={realtorData?.companyName !==null ? realtorData?.companyName :  ""} className="mt-1" />
                    <Text size="body" fontWeight="semibold" color="secondryColor" text={realtorData?.companyAddress !==null ? realtorData?.companyAddress :  ""} className="mt-1" />
                    <Text size="body" fontWeight="semibold" color="secondryColor" text="Advisor" className="mt-1" />
                  </div>
                  
                </div>
                <div>
                  <Text size="body" fontWeight="semibold" color="secondryColor" text={`Joined on: ${realtorData?.dateOfReg ? formateDate(realtorData?.dateOfReg) : '-'}`} className="mt-1" />
                </div>
              </div>

              <div className="propertyDetails mt-4">
                <table className="w-100">
                  <tr>
                    <td className="pl-0 ">
                      <div className="text-muted fs-12">Property Posts</div>
                      <p className="mb-0 fs-14 font-weight-bold">{realtorData?.propertyPostedCount || 0}</p>
                    </td>
                    <td className="p-2">
                      <div className="text-muted fs-12">Users Contacted</div>
                      <p className="mb-0 fs-14 font-weight-bold">{realtorData?.usersContactedCount || 0}</p>
                    </td>
                    <td className="p-2">
                      <div className="text-muted fs-12">Users Favorited</div>
                      <p className="mb-0 fs-14 font-weight-bold">{realtorData?.usersFavoritedCount || 0}</p>
                    </td>
                    <td className="p-2">
                      <div className="text-muted fs-12">Visit Requests</div>
                      <p className="mb-0 fs-14 font-weight-bold">{realtorData?.visitRequestCount || 0}</p>
                    </td>
                    <td className="p-2">
                      <div className="text-muted fs-12">Property Unpublished</div>
                      <p className="mb-0 fs-14 font-weight-bold">{realtorData?.unPublishedCount || 0}</p>
                    </td>
                  </tr>                  
                </table>
              </div>
              <hr></hr>
              <div className="ratingSection d-flex justify-content-between align-items-center mb-0">
                <div>
                  <Text size="regular" fontWeight="mediumbold" color="black" text="Rating and Reviews" />
                </div>
                <div className="ratingIcon">

                  <div className="d-flex align-items-start mt-2">
                    <div>
                      <StarRating rating={realtorData?.averageRating} />
                      {/* <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="(112 customers)" className="ml-1" /> */}
                    </div>
                    <Text size="regular" fontWeight="mediumbold" color="black" text={`${realtorData?.averageRating} / 5`} className="ml-3" />
                  </div>
                  <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={`( ${realtorData?.totalNumberOFRatings} customers )`} className="ml-3" />
                </div>
              </div>

              <div className="commentSection">
                {realtorData.ratingResponse && realtorData.ratingResponse.length ?
                  realtorData.ratingResponse.map((data, indx) =>
                    <>
                      <div key={indx}>
                        <div className="d-flex realtorRatingWrapper">
                          <div className='userImage mr-2'>
                            <Image
                              name="consumerIcon"
                              src={data?.profileImageUrl ? data?.profileImageUrl : userImageAvatar}
                              className="img-fluid"
                            />
                          </div>
                          <div className='realtorRatingUserWrapper'>
                            <Text size="xxSmall" fontWeight="mediumbold" color="black" text={data?.name || '-'} className="mt-1" />
                            <StarRating className="rating-sm" rating={data?.rating} />
                          </div>
                          <div>
                          <Text size="body" fontWeight="mediumbold" color="TaupeGrey" text={data.date ? formateDateTime(data?.date) : '-'} className="mt-2 pl-2" />
                          </div>
                        </div>
                        <Text size="Small" fontWeight="regularbold" color="secondryColor" text={data?.review || ''} className="ml-5 mb-2" />
                        {/* <Text size="Small" fontWeight="regularbold" color="secondryColor" text={data?.date || ''} className="mt-1" /> */}
                      </div>
                    </>
                  )
                  : ''}
              </div>
              {realtorData.ratingResponse && realtorData.ratingResponse.length ?
              <Link className="removeUnderline text-right" to={`/admin/realtor-advisor-management/advisor-details/${realtorData?.userId}/reviews`}>
              <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={"View All Reviews"} className="mt-1" />
              </Link>
              :''
              }

          <div className="tableBox bg-white mt-3">
            <div className="d-flex justify-content-between align-items-center tableHeading border-bottom p-3">
              <div>
                  <Text
                     size="regular"
                     fontWeight="mediumbold"
                     color="secondryColor"
                     text="Properties Posted"
                  />
              </div>
            </div>
              {/* <Text size="regular" fontWeight="mediumbold" color="black" text="Properties Posted"  className="mt-2"/>
              <hr /> */}
              <DataTableComponent
               data={realtorProperty}
               columns={columns}
              //  progressPending={allUsersData.isLoading}
              // paginationComponent={PaginationComponent}
              perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
              paginationPerPage={ 4 }
              paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
              progressComponent={ProgressComponent}
            />
          </div>

            </div>
          </div>
        </>
      }
    </>
  );
};

export default RealtorDetails;
