import {
   formateDate,
   handleStatusElement,
} from "../../common/helpers/Utils";
import Text from "../Text/Text";

const MapFirstTabElements = ({ module, dataLeads = [], allTaskData = [] }) => {
    if (module === "SALES" || module === "HELPDESK") {
       console.log(dataLeads);
       return dataLeads?.length
          ? dataLeads.map((_data, index) => (
             <TabDetailSectionCard key={index} date={_data.leadDate} tabNameSource={_data.source}
             tabSubName={_data.societyName} tabBottomName={_data.leadFor}/>
            ))
          : <p>No Leads Available</p>;
    } else if (module === "EXECUTION") {
       return allTaskData?.length
          ? allTaskData.map((_data, index) => (
               <div className="cardSecond" key={index}>
                  <Text
                     size="regular"
                     fontWeight="smbold"
                     color="secondryColor"
                     text={`${_data?.taskDate ? formateDate(_data?.taskDate) : "-"} | ${
                        _data?.timeSlot !==null? _data?.timeSlot:''
                     }`}
                  />
                  <div className="d-flex align-items-center pt-2">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={_data?.requestType ? _data?.requestType?.capitalize() : "-" || "-"}
                        className="mr-3"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={_data?.societyName || "-"}
                        className="mr-3"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={_data?.propertyType ? _data?.propertyType?.capitalize() : "-" || "-"}
                     />
                  </div>
               </div>
            ))
          : <p>No Tasks Available</p>;
    } else if (module === "TRANSACTION") {
       return dataLeads?.length
          ? dataLeads.map((_data, index) => (
               <div className="cardSecond" key={index}>
                  <div className="d-flex visitor-div">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={"Visitor Name"}
                        className="mr-3"
                     />
                     <span>{handleStatusElement(_data.status)}</span>
                  </div>
                  <Text
                     size="regular"
                     fontWeight="smbold"
                     color="secondryColor"
                     text={_data.visitorName}
                  />
                  <div className="separator mt-1 mb-1"></div>
                  <Text
                     size="regular"
                     fontWeight="smbold"
                     color="secondryColor"
                     text={`${_data.date ? formateDate(_data.date) : "-"} | ${_data.startTime} - ${
                        _data.endTime
                     }`}
                  />
                  <div className="d-flex align-items-center pt-2">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="primaryColor"
                        text={`For ${
                           _data.propertyCategory
                              ? _data.propertyCategory === "Lease"
                                 ? "Rent"
                                 : _data.propertyCategory
                              : "-"
                        }`}
                        className="mr-3"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={`${_data.houseNumber}, ${
                           _data.towerName !== null ? _data.towerName : ""
                        } ${_data.societyName}, ${_data.location}`}
                        className="mr-3"
                     />
                     {/* //_data.location || '-' */}
                  </div>
               </div>
            ))
          : <p>No Leads Available</p>;
    } else return null;
 };
 
 const MapSecondTabElements = ({
    module,
    dataLeadsCompleted = [],
    completedTaskData = [],
    meetingsData = [],
 }) => {
    if (module === "SALES") {
       console.log("---", dataLeadsCompleted);
       return dataLeadsCompleted?.length
          ? dataLeadsCompleted.map((_data, index) => (
               <div className="cardSecond" key={index}>
                  <Text
                     size="regular"
                     fontWeight="smbold"
                     color="secondryColor"
                     text={_data.leadDate ? formateDate(_data.leadDate) : "-"}
                  />
                  <div className="d-flex align-items-center pt-2">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={`From ${_data.source ? _data.source.capitalize() : "-" || "-"}`}
                        className="mr-3"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={_data.societyName || "-"}
                        className="mr-3"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={_data.leadFor ? _data.leadFor.capitalize() : "-" || "-"}
                     />
                  </div>
               </div>
            ))
          : <p>No data Available</p>;
    } else if (module === "EXECUTION" || module === "HELPDESK") {
       return completedTaskData?.length
          ? completedTaskData.map((_data, index) => (
               <div className="cardSecond" key={index}>
                  <Text
                     size="regular"
                     fontWeight="smbold"
                     color="secondryColor"
                     text={`${_data.taskDate ? formateDate(_data.taskDate) : "-"} | ${
                        _data.timeSlot
                     }`}
                  />
                  <div className="d-flex align-items-center pt-2">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={_data.requestType ? _data.requestType.capitalize() : "-" || "-"}
                        className="mr-3"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={_data.societyName || "-"}
                        className="mr-3"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={_data.propertyType ? _data.propertyType.capitalize() : "-" || "-"}
                     />
                  </div>
               </div>
            ))
          : <p>No data Available</p>;
    } else if (module === "TRANSACTION") {
       console.log("---", meetingsData);
       return meetingsData?.length
          ? meetingsData.map((_data, index) => (
               <div className="cardSecond" key={index}>
                  <Text
                     size="regular"
                     fontWeight="smbold"
                     color="secondryColor"
                     text={`${_data.meetingDate ? formateDate(_data.meetingDate) : "-"} | ${
                        _data.startTime
                     } - ${_data.endTime}`}
                  />
                  <div className="d-flex align-items-center pt-2">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="primaryColor"
                        text={`For ${
                           _data.propertyCategory
                              ? _data.propertyCategory === "Lease"
                                 ? "Rent"
                                 : _data.propertyCategory
                              : "-"
                        }`}
                        className="mr-3"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text={`${_data.houseNumber}, ${
                           _data.towerName !== null ? _data.towerName : ""
                        } ${_data.societyName}, ${_data.location}`}
                        className="mr-3"
                     />
                  </div>
                  <div className="separator mt-1 mb-1"></div>
                  <div className="d-flex align-items-center pt-1">
                     <div className="info-div">
                        {/* //d-flex align-items-center pt-2 */}
                        <Text
                           size="xSmall"
                           fontWeight="smbold"
                           color="TaupeGrey"
                           text={"Owner Information"}
                           className="mr-3"
                        />
                        <Text
                           size="regular"
                           fontWeight="smbold"
                           color="secondryColor"
                           text={`${_data.ownerName || "-"}`}
                        />
                        <Text
                           size="xSmall"
                           fontWeight="smbold"
                           color="secondryColor"
                           text={_data.ownerMobileNumber || "-"}
                           className="mr-3"
                        />
                     </div>
                     <div className="info-div">
                        {/* //d-flex align-items-center pt-2 */}
                        <Text
                           size="xSmall"
                           fontWeight="smbold"
                           color="TaupeGrey"
                           text={"Buyer Information"}
                           className="mr-3"
                        />
                        <Text
                           size="regular"
                           fontWeight="smbold"
                           color="secondryColor"
                           text={`${_data.buyerName || "-"}`}
                        />
                        <Text
                           size="xSmall"
                           fontWeight="smbold"
                           color="secondryColor"
                           text={_data.buyerMobileNumber || "-"}
                           className="mr-3"
                        />
                     </div>
                  </div>
               </div>
            ))
          : <p>No Deals Available</p>;
    } else return null;
 };
 
 const MapThirdTabElements = ({ module, salesTransactionData = [], dealsData = [] }) => {
    if (module === "SALES") {
       return salesTransactionData?.length
          ? salesTransactionData.map((_data, index) => (
               <div className="cardSecond" key={index}>
                  <Text
                     size="regular"
                     fontWeight="smbold"
                     color="secondryColor"
                     text={`${_data?.houseNumber ? `${_data?.houseNumber},` : ""} ${
                        _data.towerName ? _data.towerName : ""
                     } ${_data.societyName}, ${_data.locality}`}
                  />
                  <Text
                     size="xSmall"
                     fontWeight="smbold"
                     color="TaupeGrey"
                     text={`${_data.date ? formateDate(_data.date) : "-"}`}
                  />
                  {/* <div className="d-flex align-items-center pt-2">
           <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text= { `From ${ _data.source?_data.source.capitalize():'-' || '-' }` } className="mr-3" />
           <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.societyName || '-' } className="mr-3" />
           <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.leadFor? _data.leadFor.capitalize():'-' || '-' } />
         </div> */}
               </div>
            ))
          : <p>No Transactions Available</p>;
    } else if (module === "TRANSACTION") {
       return dealsData?.length
          ? dealsData.map((_data, index) => (
               <div className="cardSecond" key={index}>
                  <Text
                     size="regular"
                     fontWeight="smbold"
                     color="secondryColor"
                     text={`${_data.houseNumber}, ${
                        _data.towerName !== null ? _data.towerName : ""
                     } ${_data.societyName}, ${_data.location}`}
                  />
                  <Text
                     size="xSmall"
                     fontWeight="smbold"
                     color="TaupeGrey"
                     text={`${_data.date ? formateDate(_data.date) : "-"}`}
                  />
                  {/* <div className="d-flex align-items-center pt-2">
           <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text= { `From ${ _data.source?_data.source.capitalize():'-' || '-' }` } className="mr-3" />
           <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.societyName || '-' } className="mr-3" />
           <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.leadFor? _data.leadFor.capitalize():'-' || '-' } />
         </div> */}
               </div>
            ))
          : <p>No Transactions Available</p>;
    } else return null;
    // if ( module === 'EXECUTION' || module === 'HELPDESK') {
    // return <div className="cardSecond">
    //   <Text size="regular" fontWeight="smbold" color="secondryColor" text={ `Type: Rent` } />
    //   <div className="d-flex align-items-center pt-2">
    //     <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text= { 'Date of transaction : 05-08-2022' } className="mr-3" />
    //     <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ "Property Name: Omax 6" } className="mr-3" />
    //     {/* <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.propertyType?_data.propertyType.capitalize():'-' || '-' } /> */}
    //   </div>
    // </div>
    // }
    // if (module === 'SALES') {
    //   console.log('---', dataLeadsCompleted)
    //   return dataLeadsCompleted.length ? dataLeadsCompleted.map((_data, index)=>
    //     <div className="cardSecond" key={ index }>
    //       <Text size="regular" fontWeight="smbold" color="secondryColor" text={ _data.leadDate?formateDate(_data.leadDate):'-' } />
    //       <div className="d-flex align-items-center pt-2">
    //         <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text= { `From ${ _data.source?_data.source.capitalize():'-' || '-' }` } className="mr-3" />
    //         <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.societyName || '-' } className="mr-3" />
    //         <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.leadFor? _data.leadFor.capitalize():'-' || '-' } />
    //       </div>
    //     </div>,
    //   ) : null
    // }
    // if (module === 'EXECUTION' || module === 'HELPDESK') {
    //   return completedTaskData ? completedTaskData.map((_data, index)=>
    //     <div className="cardSecond" key={ index }>
    //       <Text size="regular" fontWeight="smbold" color="secondryColor" text={ `${ _data.taskDate?formateDate(_data.taskDate):'-' } | ${ _data.timeSlot }` } />
    //       <div className="d-flex align-items-center pt-2">
    //         <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text= { _data.requestType?_data.requestType.capitalize():'-' || '-' } className="mr-3" />
    //         <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.societyName || '-' } className="mr-3" />
    //         <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _data.propertyType?_data.propertyType.capitalize():'-' || '-' } />
    //       </div>
    //     </div>,
    //   ) : null
    // }
 };
 
 const TabDetailSectionCard = ({ date , tabNameSource ,tabSubName , tabBottomName }) => {
   return (
     <div className="cardSecond">
     <Text
        size="regular"
        fontWeight="smbold"
        color="secondryColor"
        text={date ? formateDate(date) : "-"}
     />
     <div className="d-flex align-items-center pt-2">
        <Text
           size="xSmall"
           fontWeight="smbold"
           color="TaupeGrey"
           text={`From ${tabNameSource ? tabNameSource.capitalize() : "-" }`}
           className="mr-3"
        />
        <Text
           size="xSmall"
           fontWeight="smbold"
           color="TaupeGrey"
           text={tabSubName || "-"}
           className="mr-3"
        />
        <Text
           size="xSmall"
           fontWeight="smbold"
           color="TaupeGrey"
           text={tabBottomName ? tabBottomName.capitalize() : "-" }
        />
     </div>
  </div>
   )
 }

 export   {
    MapFirstTabElements , 
    MapSecondTabElements ,
    MapThirdTabElements
 }