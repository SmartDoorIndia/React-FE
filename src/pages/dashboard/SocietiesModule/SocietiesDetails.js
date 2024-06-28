import React, { useState, useEffect, useCallback } from 'react';
import './SocietiesModule.scss';
import { connect } from 'react-redux';
import Image from '../../../shared/Image/Image';
import crossIcon from '../../../assets/svg/crossIcon.svg';
import Text from '../../../shared/Text/Text';
import { Col, Row } from 'react-bootstrap';
import {
  getSocietyDetails,
  getSocietyUsers,
  getPropertyAnalytics,
  getAllPropertyDeals,
  getAllLeadsBySociety,
  getAllPropertyBySocietyId, disableSociety , saveSocietyLogoAction, deleteSocietyLogo} from '../../../common/redux/actions';
import { formateDate, ToolTip, showLimitedChar } from '../../../common/helpers/Utils';
import DataTableComponent from '../../../shared/DataTable/DataTable';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import userImage from '../../../assets/svg/avatar_sml.svg';
import Loader, { TableLoader } from '../../../common/helpers/Loader';
import contentIco from '../../../assets/images/content-ico.svg';
import sortIocn from '../../../assets/svg/sort-icon.svg';
import MapComponent from '../../../shared/Map/MapComponent';
import ConfirmationModal from '../../../shared/Modal/ConfirmationModal/ConfirmationModal';
import { provideAuth } from '../../../common/helpers/Auth';
import S3 from 'react-aws-s3'
import Constants from '../../../common/helpers/Constants';
import cameraIcons from "../../../assets/images/camra-icon.svg";
import docIcon from '../../../assets/svg/doc.svg';

const ReactS3Client = new S3(Constants.CONFIG);

const { userData } = provideAuth();

// const PropertyLeadsColumns = [
//   {
//     name: 'Id',
//     selector: 'leadId',
//     center: true,
//     sortable: true,
//   },

//   {
//     name: 'Date',
//     selector: 'leadDate',
//     sortable: true,
//     center: true,
//     cell: ({ leadDate })=>(<span>{formateDate(leadDate)}</span>),
//   },
//   {
//     name: 'From',
//     selector: 'source',
//     center: true,
//   },
//   {
//     name: 'City',
//     selector: 'city',
//     center: true,
//   },
//   {
//     name: 'Type',
//     selector: 'leadFor',
//     center: true,
//   },
//   {
//     name: 'Status',
//     selector: 'status',
//     center: true,
//     cell: ({ status })=>(handleStatusElement(status)),
//   },
//   {
//     name: 'Action',
//     center: true,
//     cell: (row) =>( <div className="action">
//       <span>
//         <Link to={ { pathname: '', state: { userData: row } } }>
//           <Image name="editIcon" src={ contentIcon } />
//         </Link>
//       </span>
//     </div>
//     ),
//   },

// ];

const PropertyListedColumns = [
  {
    name: 'Id',
    selector: 'PropertyId',
    center: true,
    sortable: true,
    cell: (row, index)=>(<span>{index+1}</span>),
  },
  {
    name: 'Added On',
    selector: 'addedOnDate',
    sortable: true,
    center: true,
    style: { 'max-width': '120px' },
    maxWidth: '130px',
    cell: ({ addedOn })=>(<span>{`${ formateDate(addedOn) }`|| ''}</span>),
  },
  {
    name: 'Owner',
    selector: 'propertyPostedBy',
    center: true,
    cell: ({ propertyPostedBy, imageUrl }) => (
      <div className="userName" >
        <Text size="Small" style={ { width: 'max-content' } } color="secondryColor" text={ propertyPostedBy } />
      </div>
    ),
  },
  {
    name: 'Location',
    selector: 'city',
    center: true,
    style: { 'max-width': '60px' },
    maxWidth: '60px',
    cell: ({ propertyAddress }) => (
      <ToolTip position="top" style={{ width: "100%" }} name={propertyAddress || ""}>
         <span className="cursor-pointer elipsis-text">
            {" "}
            {propertyAddress?.substring(
               0,
               propertyAddress?.indexOf(",") !== -1 ? propertyAddress?.indexOf(",") : propertyAddress?.length
            )}
         </span>
      </ToolTip>
   ),
  },
  {
    name: 'Type',
    selector: 'propertySubType',
    center: true,
    cell: ({ propertySubType })=>(<span>{`${ propertySubType || '' }`}</span>),
  },
  {
    name: 'Information',
    selector: 'propertyInformation',
    center: true,
    cell: ({ propertyRate, numberOfBath, numberOfBed, carpetArea, bedRooms })=>(<span>{`${ carpetArea } Sq. ft | ${ bedRooms === null ? '0': bedRooms||'0' } Bed | ${ numberOfBath === null ? '0': numberOfBath||'' } Bath`}</span>),
  },
  {
    name: 'Assets',
    selector: ((row) => row.smartdoorPropertyId),
    sortable: false,
    center: true,
    maxWidth: '30px',
    cell: ({ row, smartdoorPropertyId, propertyDocsResp })=>(
      
      <Link className='dociconSpace' to={ { pathname: '/admin/property/property-documents', state: {
        propertyId: smartdoorPropertyId,
        propertyDocsResp: propertyDocsResp 
        } } }>
          <Image alt="doc icon" src= {docIcon} />
        </Link>          
    )
  },
  // {
  //   name: 'Assets',
  //   selector: 'propertyassets',
  //   style: { 'max-width': '120px' },
  //   maxWidth: '120px',
  //   center: true,
  //   cell: ({ propertyDocsResp, propertyImageResp, smartdoorPropertyId }) => (
  //     <span className="text-align-center">
  //       <Link to={ { pathname: '/admin/property/property-documents', state: { propertyId: smartdoorPropertyId,
  //         propertyDocsResp: propertyDocsResp } } }>
  //         <span style= { { color: '#cc0000' } }>Documents images</span>
  //       </Link>
  //     </span>),
  // },
  {
    name: 'Action',
    selector: 'year',
    center: true,
    style: { 'max-width': '60px' },
    maxWidth: '60px',
    cell: ({ row, smartdoorPropertyId }) =>( <div className="action">
      <ToolTip position="left" name="View Details">
        <span>
          <Link to={ { pathname: '/admin/societies/property-details',
            state: { propertyId: smartdoorPropertyId,
              userId: userData.userid },
          } }>
            <Image name="editIcon" src={ contentIco } />
          </Link>
        </span>
      </ToolTip>
    </div>
    ),
  },

];

// const PaginationActionButton = () => (
//   <div className="d-flex justify-content-between">
//     <Link to="/admin/sales/new-entry"><Buttons name="Add New Entry" varient="success" type="submit" size="Small" color="white" /></Link>   
//   </div>
// );

// const PaginationComponent = (props) => (<Pagination { ...props } PaginationActionButton={ PaginationActionButton } />);

const sortIcon = <img src={ sortIocn } alt="" className="ml-1" width='10px' />;

const ProgressComponent = <TableLoader />

const Societies = (props) => {
  const {
    getPropertyAnalytics,
    getAllPropertyDeals,
    getAllLeadsBySociety,
    getAllPropertyBySocietyId,
    societyAnalyticsData,
    societyDealsData,
    // societyPropertyLeadsData,
    societyPropertyListedData,
    // dispatch,
  } = props;

  const societyId = props.location.state ? props.location.state.societyId : '';
  const [ loading, setLoading ] = useState(true);
  const [ societyData, setSocietyData ] = useState({})
  const [ societyUserData, setSocietyUserData ] = useState({})
  const [ show, setShow ] = useState(false);
  const [ blockData, setBlockData ] = useState({});
  const [logo , setLogo] = useState(undefined)
  const [logoLink, setLogoLink] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [imageLoader, setImageLoader] = useState(false)

  // getSocietyDetails()
  const _getSocietyDetails = useCallback(() => {
    getSocietyDetails({ societyId: societyId })
        .then((response)=>{
          setLoading(false);
          if (response.data) {
            if (response.data.resourceData) 
            {setSocietyData(response.data.resourceData)
            setLogoLink(response.data.resourceData.societyLogo)}

          }
        })
        .catch((error)=>{
          setLoading(false);
        })
  }, [ getSocietyDetails ])

  // getSocietyDetails()
  const _getSocietyUsers = useCallback(() => {
    getSocietyUsers({ societyId: societyId })
        .then((response)=>{
          setLoading(false);
          if (response.data) {
            if (response.status === 200 && response.data.resourceData) setSocietyUserData(response.data.resourceData);
          }
        })
        .catch((error)=>{
          setLoading(false);
        })
  }, [ getSocietyUsers ])

  useEffect(()=>{
    _getSocietyDetails();
    _getSocietyUsers();
    getPropertyAnalytics({ societyId: societyId });
    getAllPropertyDeals({ societyId: societyId });
    getAllPropertyBySocietyId({ societyId: societyId });
  }, [ _getSocietyDetails, _getSocietyUsers, getPropertyAnalytics, getAllPropertyDeals, getAllLeadsBySociety, getAllPropertyBySocietyId ])

  function handleSocietyDisbale() {
    disableSociety({ societyId: societyId })
        .then((response)=>{
          if (response.data && response.data.status === 200) _getSocietyDetails();
        })
        .catch((err)=>{
        })
    handleClose();
  }

  const fileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result, "target.result")
        setLogo(e.target.result)
        // this.setState({ builderPropertyImg: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    console.log(event.target.files[0], "after upload files")
    // this.setState({ imageUrl: event.target.files[0] });
    console.log(event.target.files, "before s3 files")
    if (event.target.files.length > 0) {
      // setImageLoader(true)
      ReactS3Client.uploadFile(event.target.files[0], event.target.files[0].name)
        .then((data) => {
          console.log("data", data);
          saveSocietyLogoAction({societyId,societyLogo : data.location})          
            .then((response) => {
              setLoading(false);
              setLogoLink(data.location)
              if (response?.data) {
                if (response.data.statue===200) {
                  // setImageLoader(false)
                  // setpropertyData(response.data.resourceData);
                  // setOwnerId(response.data.resourceData.postedById)
                  _getSocietyDetails();
                }
              }
              // console.log('responseSocietyDetails', response);
              // console.log('owner id', ownerId)
            })
            .catch((error) => {
              // setImageLoader(false)
              setLoading(false);
              console.log('error', error)
            })

          // addBuilderProject({ ...builderPropertyData, imageUrl: data.location })
          //    .then((response) => {
          //       if (response.data && response.data.status === 200) {
          //          this.props.history.push("/admin/builder-property");
          //       }
          //    })
          //    .finally(() => {
          //       this.setState({ disableSave: false });
          //    });
        })
        .catch((err) => {
          // addBuilderProject({ ...builderPropertyData, imageUrl: "" })
          //    .then((response) => {
          //       if (response.data && response.data.status === 200) {
          //          this.props.history.push("/admin/builder-property");
          //       }
          //    })
          //    .finally(() => {
          //       this.setState({ disableSave: false });
          //    });
        });
      console.log(event.target.files[0], 'end file');
    }
  }

  // const fileUpload = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       console.log(e.target.result, "target.result")
  //       setLogo(e.target.result );
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  //   console.log(event.target.files[0], "after upload files")

  //   const imageData = {
  //     // propertyId: propertyId,
  //     propertyDocs: [],
  //     propertyImage: [
  //       {
  //         docId: null,
  //         docName: "",
  //         docURL: ''
  //       }
  //     ]
  //   };
  //   // this.setState({ imageUrl: event.target.files[0] });
  //   console.log(event.target.files, "before s3 files")
  //   if (event.target.files.length > 0) {
  //     // setImageLoader(true)
  //     ReactS3Client.uploadFile(event.target.files[0], event.target.files[0].name)
  //       .then((data) => {
  //         console.log("data", data);
  //         // const property_image = []
  //         // property_image.push(
  //         //   {
  //         //     docId: null,
  //         //     docName: "",
  //         //     docURL: data.location
  //         //   }
  //         // )
  //         // const image_data = {
  //         //   ...imageData,
  //         //   propertyDocs: [],
  //         //   propertyImage: property_image
  //         // }
  //         // // setImageData({})
  //         // addImage(image_data
  //         //   // ...imageData,
  //         //   //  propertyId:propertyId,
  //         //   //  propertyImage: [...propertyImage],
  //         //   //  propertyImage:[
  //         //   //   {...iZgeData.propertyImage,docURL: data.location}

  //         //   // ],

  //         // )
  //         //   .then((response) => {
  //         //     setLoading(false);
  //         //     if (response.data) {
  //         //       if (response.data.resourceData) {
  //         //         setImageLoader(false)
  //         //         // setpropertyData(response.data.resourceData);
  //         //         // setOwnerId(response.data.resourceData.postedById)
  //         //         _getPropertyDetails();
  //         //       }
  //         //     }
  //         //     // console.log('responseSocietyDetails', response);
  //         //     // console.log('owner id', ownerId)
  //         //   })
  //         //   .catch((error) => {
  //         //     setImageLoader(false)
  //         //     setLoading(false);
  //         //     console.log('error', error)
  //         //   })
  //         // addBuilderProject({ ...builderPropertyData, imageUrl: data.location })
  //         //    .then((response) => {
  //         //       if (response.data && response.data.status === 200) {
  //         //          this.props.history.push("/admin/builder-property");
  //         //       }
  //         //    })
  //         //    .finally(() => {
  //         //       this.setState({ disableSave: false });
  //         //    });
  //       })
  //       .catch((err) => {
  //         // addBuilderProject({ ...builderPropertyData, imageUrl: "" })
  //         //    .then((response) => {
  //         //       if (response.data && response.data.status === 200) {
  //         //          this.props.history.push("/admin/builder-property");
  //         //       }
  //         //    })
  //         //    .finally(() => {
  //         //       this.setState({ disableSave: false });
  //         //    });
  //       });
  //     console.log(event.target.files[0], 'end file');
  //   }
  // }

  const dltSocietyLogo = () => {
    deleteSocietyLogo({ societyId: societyId })
        .then((response)=>{
          if (response.data && response.data.status === 200) 
          {
            
            ReactS3Client.deleteFile(societyData?.societyLogo)
            .then(response => console.log(response,"deleted from aws"))
            .catch(err => console.error(err,"error while deleting on aws"))
            
          }
          setLogo({logo: ''})
          _getSocietyDetails();
        })
        .catch((err)=>{
        })
  }
  
  console.log("societyDealsData:", societyDealsData)

  return (
    <>
      <div className="dashboard container-fluid12" style={{height: '79vh', overflowY:'auto'}}>
        <Row>
          <Col lg={ 8 }>
            <Row>
              {societyDealsData.data.length ? 
                <Col lg={ 4 }>
                <div className="whiteBg">
                  <div className="scroll">
                    <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Property Deals" className="text-center" />
                    {
                      societyDealsData?.isLoading ?
                        <Loader /> :
                        // <p>Loading..</p> :
                          societyDealsData?.data?.map((_value, index)=> (
                        <>
                          <div className="separator mt-2 mb-2"></div>
                          <div className="pt-2">
                            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Sold On" />
                            <Text size="xSmall" fontWeight="mediumbold" color="secondryColor" text={ _value.soldOn || '' } />
                          </div>
                          <div className="pt-2">
                            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Address" />
                            <Text size="xSmall" fontWeight="mediumbold" color="secondryColor" text={ _value.address || '' } />
                          </div>
                          <div className="pt-2">
                            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Deal Amount" />
                            <div className="d-flex">
                              <Text size="xSmall" fontWeight="mediumbold" color="secondryColor" text={ `₹${ _value.dealAmount || '' } ` } />
                              <Text size="xSmall" fontWeight="mediumbold" color="secondryColor" className="mr-1 ml-1" text=" | " />
                              <Text size="xSmall" fontWeight="mediumbold" color="successColor" text={ ` +₹${ _value.dealAmount || ' ' } ` } />
                            </div>
                          </div>

                        </>
                      ),
                      )
                    }

                  </div>
                </div>
              </Col>
              : null }
              <Col lg={ societyDealsData.data.length ? '8' : '12' }>
                <div className="whiteBg whiteBgHeight crossIconWrap position-relative">
                  <Text size="Small" fontWeight="smbold" color="secondryColor" text="Society Logo" className="text-center mb-2" />
                  {logoLink ? 
                    <div class="crossIcon position-absolute">
                    <span class="closeRight">
                      <Image onClick={dltSocietyLogo} name="crossIcon" src={crossIcon} alt="cross icon" />
                    </span>
                  </div>
                  : null }
                  <div className="companyLogo">
                    <Image name="companyLogo" src={  logoLink || 'https://smartdoor-app.s3.us-east-2.amazonaws.com/society-logo/Societies_320.svg' } />
                  </div>
                  <div className='uploadIcon text-right'>
                    <div className='inputFields'>
                      <label controlId="formFileLg" className='mb-0'>
                        <Form.Control accept=".png, .jpg, .jpeg" type="file" size="lg" onChange={(e) => fileUpload(e)}/>
                        <Image src={cameraIcons} className="img-fluid" alt="Upload Icon" />
                      </label>

                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="eventDetails">
              <div className="d-flex justify-content-between">
                <div className="">
                  <Text size="large" fontWeight="mediumbold" color="secondryColor" text={ societyData.societyName || '-' } />
                  <Text color="secondryColor" className = 'fs-14 fw500' text={ societyData.address || '-' } />
                </div>
                {societyData.directAccessed ? <Text className="ml-2" size="Small" fontWeight="smbold" color="TaupeGrey" text={"DIRECT ACCESSED"} /> : ''}

                <div>

                  {/* <Buttons
                    name ={ 'Upload society logo' }
                    varient ={  'primary'  }
                    type ="submit"
                    size ="Small"
                    className='mr-2'
                    color ={  'white'  }
                    onClick={() => fileUpload()}
                  /> */}
                  {/* <input type="file" placeholder='Upload society logo' onClick={(e) => fileUpload(e)} className='mb-2'/> */}
                 
                  <div>
                  {/* <Buttons
                    name ={ societyData.disabled ? 'Enable' : 'Disable' }
                    varient ={ societyData.disabled ? 'success' : 'disable' }
                    type ="submit"
                    size ="Small"
                    color ={ societyData.disabled ? 'white' : 'disable' }
                    onClick ={()=> {
                      handleShow()
                      setBlockData({ id: societyId, isBlocked: societyData.disabled })
                    }}
                  /> */}
                  </div>
                </div>
              </div>
              <div className="separator mt-2 mb-2"></div>
              <Row className="mt-4">
                <Col>
                  <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Built In" />
                  <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyData.builtInYear || '-' } />
                </Col>
                <Col>
                  <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Plot Size" />
                  {/* {societyData.plotSize || "-" } */}
                  <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ (societyData.plotSize === null) ? '-': societyData.plotSize + ' Sq. Ft.' }/>
                </Col>
                {/* <Col>
                  <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Parking" />
                  <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyData.parking ? 'Yes' : 'No' } />
                </Col> */}
                <Col>
                  <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Properties Listed" />
                  <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyData.noOfProperties || '-' } />
                </Col>
              </Row>
              <div className="separator mt-4 mb-2"></div>
              <div className="societyUsersList mt-4">
                <div className="d-flex justify-content-between">
                  <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Society Users" className="mb-2" />
                </div>
                {
                                    societyUserData.length ?
                                    societyUserData.map((_value_, index)=>
                                      <div className="authorContact mt-4">
                                        <div className="d-flex">
                                          <div className="author">
                                            <Image name="author" className="object-cover" src={ _value_.imageUrl || userImage } />
                                          </div>
                                          <div className="ml-3 mt-2">
                                            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ `${_value_.name} (${_value_.position})` } />
                                            <Text size="xSmall" fontWeight="smbold" color="secondryColor" text={ _value_.contactNumber } />
                                          </div>
                                        </div>
                                      </div>) : null
                }

              </div>
            </div>
          </Col>
          <Col lg={ 4 }>
            <div className="whiteBg">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Description" className="mb-2" />
              <Text size="Small" fontWeight="smbold" color="secondryColor" text={ `${ showLimitedChar(societyAnalyticsData.data.description) }` } />
              <div className="mapLocation mt-4">
                <div style={ { height: '120px', overflow: 'hidden' } }>
                  <MapComponent p_lat = { societyAnalyticsData.data.latitude } p_lng ={ societyAnalyticsData.data.longitude } />
                </div>
              </div>
              <div className="separator mt-2 mb-2"></div>

              {
                                societyAnalyticsData.isLoading ? <Loader /> :
                                <div className="mt-3">
                                  <Text size="large" fontWeight="mediumbold" color="secondryColor" text="Property Analytics" />
                                  {/* text={`Registered On: - ${formateDate(societyAnalyticsData.data.registerdOn) || "-"}`} /> */}
                                  <Text size="Small" fontWeight="semibold" color="secondryColor"
                                    text={ (societyAnalyticsData.data.registerdOn === null)?'Registered On: - ':`Registered On: ${ formateDate(societyAnalyticsData.data.registerdOn)||'-' }` } />
                                  <Row className="mt-4">
                                    <Col>
                                      <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="User Visited" />
                                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyAnalyticsData.data.userVisited } />
                                    </Col>
                                    <Col>
                                      <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Meetings Done" />
                                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyAnalyticsData.data.meetingDone } />
                                    </Col>
                                    <Col lg={ 3 }>
                                      <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Favorited" />
                                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyAnalyticsData.data.favouriteCount } />
                                    </Col>
                                  </Row>
                                  <Row className="mt-4">
                                    <Col>
                                      <Text className="text-muted fs-12" size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Upcoming Visits" />
                                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyAnalyticsData.data.upcomingVisits } />
                                    </Col>
                                    <Col>
                                      <Text className="text-muted fs-12" size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Cancelled Deals" />
                                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyAnalyticsData.data.dealCancelled } />
                                    </Col>
                                    <Col lg={ 3 }>
                                      <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="On-Hold" />
                                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ societyAnalyticsData.data.dealOnHold } />
                                    </Col>
                                  </Row>
                                </div>
              }
            </div>

          </Col>
        </Row>

            <div className="tableBox mb-3">
              <div className="d-flex justify-content-between align-items-center tableHeading">

            <div>
                  <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Properties Listed" />
                </div>
            {/* <div className="locationSelect">
                  <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Location:</Form.Label>
                <Form.Control as="select" className="locationWidth">
                      <option>Select location</option>
                    </Form.Control>
              </Form.Group>
                </div> */}

          </div>

              <DataTableComponent
            data={ societyPropertyListedData.data }
            columns={ PropertyListedColumns }
            progressPending={ false }
            // paginationComponent={PaginationComponent}
            perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
            paginationPerPage={ 4 }
            paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
            sortIcon={ sortIcon }
            progressComponent={ ProgressComponent }

          />
             

            </div>

      </div>

      <ConfirmationModal
        title ={ blockData.isBlocked?'Are you sure you want to enable this society?':'Are you sure you want to disable this society?' }
        cancelButtonName = "Cancel"
        primaryButtonName = { blockData.isBlocked?'Enable':'Disable' }
        show = { show }
        handleClose = { handleClose }
        handleShow = { handleShow }
        handlePerformAction = { handleSocietyDisbale }
      />

    </>
  )
}

const mapStateToProps = ({ societyAnalyticsData, societyDealsData, societyPropertyLeadsData, societyPropertyListedData }) => ({
  societyAnalyticsData,
  societyDealsData,
  societyPropertyLeadsData,
  societyPropertyListedData,
});

const actions = {
  getPropertyAnalytics,
  getAllPropertyDeals,
  getAllLeadsBySociety,
  getAllPropertyBySocietyId,
};

// const withConnect = connect(
//     mapStateToProps,
//     actions,
// );

export default connect(mapStateToProps, actions)(Societies);
