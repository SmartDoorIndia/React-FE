/** @format */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Buttons from "../../../shared/Buttons/Buttons";
import Text from "../../../shared/Text/Text";
import "./ConfirmationModal.scss";
// import { DateRangePicker } from 'react-date-range';
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'rsuite';
// import 'rsuite/ButtonToolbar/styles/index.less';
const ConfirmationModal = (props) => {
   console.log(props.whichModal, "modal selected");
   const { beforeToday } = DateRangePicker;
   const [errorMsgVal, setErrorMsgVal] = useState(false);
   const errorMsg = () => setErrorMsgVal(true);

   // const selectionRange = {
   // dateDisplayFormat:"YYYY-MM-DD",
   // retainEndDateOnFirstSelection:true,
   // // startDate: dateObj?.startDate? dateObj.startDate:new Date(),
   // // endDate: dateObj?.endDate? dateObj.endDate:new Date(),
   // startDate: new Date(),
   // endDate: new Date(),
   // key: 'selection',
   // showDateDisplay:true,
   // // startDatePlaceholder: startDate?startDate:moment(new Date()).format("YYYY-MM-DD"),
   // // endDatePlaceholder: endDate?endDate:moment(new Date()).format("YYYY-MM-DD"),
   // }
   // const [state, setState] = useState([
   // {
   // startDate: new Date(),
   // endDate: null,
   // key: 'selection'
   // }
   // ]);
   return (
      <>
         <Modal show={props.show} onHide={props.handleClose} className="confirm_modal" centered>
            <Modal.Header></Modal.Header>
            <Modal.Body>
               <div>
                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text={props.title}
                  />
                  {/* commented code */}
                  {/* {props.showDateRange ?
<DateRange
editableDateInputs={true}
startDatePlaceholder = 'Start date'
endDatePlaceholder = 'End date'
rangeColors = {['#BE1452']}
onChange={item => {
console.log("item..:",item.selection )
if(props.submodule === 'block'){
props.setDates([item.selection])
}
if(props.submodule === 'filter'){
props.setFilterDates([item.selection])
}
}}
moveRangeOnFirstSelection={false}
// ranges={state}
ranges={props.submodule === 'block' ? props.dates : props.filterDates}
/>
:null} */}
                  {props.showDateRange ? (
                     <>
                        <DateRangePicker
                           placement="bottomStart"
                           appearance="default"
                           placeholder="Select Date Range"
                           disabledDate={props.whichModal === "filter" ? null : beforeToday()}
                           style={{
                              width: "100%",
                              height: "48px",
                              color: "darkgray",
                              marginTop: "10px"
                           }}
                           value={
                              props.submodule === "block"
                                 ? props.datePickerblockvalue
                                 : props.datePickerFiltervalue
                           }
                           // defaultOpen={true}
                           onChange={(value) => {
                              console.log("confirmation modal .js:", value);
                              if (props.submodule === "filter") {
                                 props.setDatePickerFiltervalue(value);
                              }
                              if (props.submodule === "block") {
                                 props.setDatePickerblockvalue(value);
                              }
                           }}
                           onOk ={()=> setErrorMsgVal(false)}
                        />
                        {errorMsgVal ? (
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={"This field is required"}
                           />
                        ) : null}
                     </>
                  ) : null}
                  {/* <DateRangePicker
dateDisplayFormat="yyyy-MM-dd"
ranges={[selectionRange]}
editableDateInputs={true}
showPreview={false}
// startDatePlaceholder= {startDate?startDate:moment(new Date()).format("YYYY-MM-DD")}
// endDatePlaceholder= {endDate?endDate:moment(new Date()).format("YYYY-MM-DD")}
//onChange={handleSelect}
/> */}
                  <div className="text-center mt-5 mb-3">
                     <Buttons
                        name={props.cancelButtonName}
                        varient="disable"
                        type="button"
                        size="xSmall"
                        color="black"
                        className="mr-3"
                        onClick={props.handleClose}
                     />
                     <Buttons
                        name={props.primaryButtonName}
                        varient="primary"
                        type="submit"
                        size="xSmall"
                        color="white"
                        onClick={
                           props.datePickerblockvalue === "" && props.primaryButtonName === "Block"
                              ? errorMsg
                              : props.handlePerformAction
                        }
                     />
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};
export default ConfirmationModal;
