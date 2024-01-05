/** @format */

import React, { Component } from "react";
import Text from "../../../../shared/Text/Text";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./CreateTicket.scss";
import Buttons from "../../../../shared/Buttons/Buttons";
import { createTicket, getTeamList } from "../../../../common/redux/actions";
import { getPropertyList, getTicketNameList } from "../../../../common/redux/actions";
import { validateCreateTicket } from "../../../../common/validations";
import { dateWithFormate } from "../../../../common/helpers/Utils";

class CreateTicket extends Component {
   
   constructor(props) {
      super(props);
console.log(props,"tttttttttttttttttttttttt")
      this.state = {
         error: {},
         actionToSolve: "",
         assignTo: "",
         callFrom: props.location.state ? props.location?.state?.consumer_name : "",
         callerId: props.location.state?.consumerId ? props.location.state?.consumerId : props.location.state?.callerId,
         // callerIdFromServiceReq: props.location.state ? props.location.state.callerId : "",
         email: "",
         notify: false,
         phoneNumber: props.location.state ? props.location.state?.consumer_contactNumber : "",
         problem: "",
         property: "",
         severity: "",
         ticketName: "",
         propertyList: [],
         userid: props.location.state ? props.location.state.consumerId : "",
         source: "web",
         ticketNameList: [],
         ticketNameVal: "",
         otherTicketName: "",
         buttonDisable: false,
         isPropertyListLoading: true,
         teamList: []
      };
   }

   handleCheckBoxChange = () => {
      this.setState({
         notify: !this.state.notify,
      });
   };

   componentDidMount() {
      getPropertyList({ userId: this.state.callerId })
         .then((response) => {
            if (response.data && response.data.status === 200) {
               this.setState({
                  isPropertyListLoading : false,
                  propertyList: response.data.resourceData
               });
            }
         })
         .catch((error) => {})
         // .finally(()=> this.setState({
         //    isPropertyListLoading : false,
         // }))
      getTicketNameList()
         .then((response) => {
            if (response.data && response.data.status === 200) {
               this.setState({
                  ticketNameList: response.data.resourceData,
               });
            }
         })
         .catch((error) => {});

      getTeamList()
         .then((response) => {
            if (response.data && response.data.status === 200) {
               this.setState({
                  teamList: response.data.resourceData,
               });
            }
         })
         .catch((error) => {});
   }

   changeHandler = (e) => {
      const result = e.target.value.replace(/\D/g, '');
      // setUserName(result.slice(0,10))
      this.setState({phoneNumber: result.slice(0,10)})
    }

   handleValidate = (event) => {
      event.preventDefault();
      this.setState({ buttonDisable: true });
      let ticketData = {
         actionToSolve: this.state.actionToSolve,
         assignTo: this.state.assignTo,
         callFrom: this.state.callFrom,
         callerId: this.state.callerId,
         email: this.state.email,
         notify: this.state.notify,
         phoneNumber: this.state.phoneNumber,
         problem: this.state.problem,
         property: Number(this.state.property),
         severity: this.state.severity,
         ticketName: this.state.ticketName,
         source: "web",
         requestDate: dateWithFormate(Date.now(), "YYYY-MM-DD"),

      };

      console.log(ticketData,"ticket data");
      let validate = validateCreateTicket(ticketData);
      console.log("ticketData validate:", validate);
      this.setState({ error: validate.errors });
      if (validate.isValid) {
         createTicket({ ...ticketData })
            .then((response) => {
               if (response.data && response.data.status === 200) {
                  this.props.history.goBack();
               }
            })
            .finally(() => {
               this.setState({ buttonDisable: false });
            });
      } else this.setState({ buttonDisable: false });
   };

   render() {
      const {
         error,
         actionToSolve,
         assignTo,
         callFrom,
         email,
         notify,
         phoneNumber,
         problem,
         property,
         severity,
         ticketName,
         propertyList,
         ticketNameList,
         ticketNameVal,
         otherTicketName,
         buttonDisable,
      } = this.state;

      return (
         <>
            <div style={{ height: "2%" }}></div>
            <div className="whiteBg">
               <div className="d-flex justify-content-between">
                  <div className="Title">
                     <div className="d-flex align-items-center">
                        <Text
                           size="medium"
                           fontWeight="mediumbold"
                           color="secondryColor"
                           text="Create Ticket"
                           className="mr-2"
                        />
                     </div>
                     {/* <Text size="small" color="secondryColor" text="Ticket No:123456"  className="mr-2"/> */}
                  </div>
               </div>
               <div className="createTicket mt-4">
                  <form noValidate onSubmit={this.handleValidate} autoComplete="off">
                     <Row>
                        <Col lg="7">
                           <Row className="mb-2">
                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="callFrom">
                                       <Form.Label>Call From</Form.Label>
                                       <Form.Control
                                          type="text"
                                          maxLength="30"
                                          placeholder="Enter Name"
                                          value={callFrom}
                                          onChange={(e) =>
                                             this.setState({ callFrom: e.target.value })
                                          }
                                       />

                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.callFrom}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>

                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="phoneNumber">
                                       <Form.Label>Phone Number</Form.Label>
                                       <Form.Control
                                          type="text"
                                          maxLength={20}
                                          onWheel={() => document.activeElement.blur()}
                                          placeholder="Enter Number"
                                          value={phoneNumber}
                                          // onChange={(e) =>
                                          //    this.setState({ phoneNumber: (e.target.value).slice(0,10) })
                                          // }
                                          onChange={(e) => this.changeHandler(e) }
                                       />
                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.phoneNumber}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>
                           </Row>

                           <Row className="mb-2">
                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="email">
                                       <Form.Label>Email</Form.Label>
                                       <Form.Control
                                          type="text"
                                          maxLength="50"
                                          placeholder="Enter Email"
                                          value={email}
                                          onChange={(e) => this.setState({ email: e.target.value })}
                                       />
                                       <Text color="dangerText" size="xSmall" text={error.email} />
                                    </Form.Group>
                                 </div>
                              </Col>

                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="property">
                                       <Form.Label style={{ zIndex: "9999" }}>Property</Form.Label>
                                       {/* <Form.Control type="number" maxLength={20} placeholder="Enter Property" 
                                        // value={accountNumber} onChange={(e) => this.setState({ accountNumber: e.target.value })} 
                                        /> */}
                                       <Form.Control
                                          as="select"
                                          value={property}
                                          onChange={(e) =>
                                             this.setState({ property: e.target.value })
                                          }>
                                          {this.state.isPropertyListLoading? '' : propertyList.length ? <option value="">Select</option>:<option value="">No property available</option>}
                                          {propertyList.length ?                                          
                                          propertyList.map((cVal, cInd) => {
                                             return (
                                                <option value={cVal.propertyId}>{`${
                                                   cVal.houseNumber + "," || ""
                                                } ${cVal.society || ""}, ${
                                                   cVal.city || ""
                                                }`}</option>
                                             );
                                          }) :''
                                          // <option value="">No property available</option>
                                          }
                                       </Form.Control>

                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.property}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>
                           </Row>
                           {/* <Col lg= {(propertyAgeVal === "Others")?"3":"4"}></Col> */}
                           <Row className="mb-2">
                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="ticketName">
                                       <Form.Label>Ticket Name</Form.Label>
                                       <Form.Control
                                          as="select"
                                          value={ticketName ? ticketName : otherTicketName}
                                          onChange={(e) => {
                                             e.target.value !== "Other"
                                                ? this.setState({
                                                     ticketName: e.target.value,
                                                     otherTicketName: "",
                                                  })
                                                : this.setState({
                                                     otherTicketName: e.target.value,
                                                     ticketName: "",
                                                  });
                                          }}>
                                          <option value="">Select</option>
                                          {ticketNameList.map((cVal, cInd) => {
                                             return <option value={cVal}>{`${cVal}`}</option>;
                                          })}
                                       </Form.Control>

                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={!otherTicketName ? error.ticketName : ""}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>

                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="assignTo">
                                       <Form.Label>Assign To</Form.Label>
                                       <Form.Control
                                          as="select"
                                          value={assignTo}
                                          onChange={(e) =>
                                             this.setState({ assignTo: e.target.value })
                                          }>
                                          <option value="">Select</option>
                                          {this.state.teamList.map((option) => (
                                             <option value={option.value}>
                                                {option}
                                             </option>
                                          ))}
                                          {/* <option value="Sales Team">Sales Team</option> */}
                                          {/* <option value="Installation Team">Installation Team</option> */}
                                          {/* <option value="Finance Team">Finance Team</option>
                                          <option value="Transaction Team">Transaction Team</option> */}
                                       </Form.Control>

                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.assignTo}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>
                           </Row>

                           <Row>
                              {/* {otherTicketName === "Other" ? (
                                 <Col lg="6">
                                    <Form.Group controlId="ticketNameOther">
                                       <Form.Label>Other Ticket Name</Form.Label>
                                       <Form.Control
                                          type="text"
                                          maxlength="20"
                                          placeholder="Enter Ticket Name"
                                          onChange={(e) =>
                                             this.setState({ ticketName: e.target.value })
                                          }
                                       />
                                    </Form.Group>
                                    <Text
                                       color="dangerText"
                                       size="xSmall"
                                       className="pt-2"
                                       text={otherTicketName ? error.ticketName : ""}
                                    />
                                 </Col>
                              ) : null} */}

                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="severity">
                                       <Form.Label>Severity</Form.Label>
                                       <Form.Control
                                          as="select"
                                          value={severity}
                                          onChange={(e) =>
                                             this.setState({ severity: e.target.value })
                                          }>
                                          <option value="">Select</option>
                                          <option value="Low">Low</option>
                                          <option value="Medium">Medium</option>
                                          <option value="High">High</option>
                                       </Form.Control>

                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.severity}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>
                           </Row>
                        </Col>
                        <Col lg="4">
                           <div className="mb-3">
                              <Form.Group controlId="exampleFormControlTextarea1">
                                 <label for="exampleFormControlTextarea1" class="form-label">
                                    Problem
                                 </label>
                                 <textarea
                                    id="exampleFormControlTextarea1"
                                    className="textArea"
                                    rows="5"
                                    value={problem}
                                    maxlength="950"
                                    onChange={(e) => this.setState({ problem: e.target.value })}
                                    placeholder="Enter Problem"></textarea>
                                 <Text color="dangerText" size="xSmall" text={error.problem} />
                              </Form.Group>
                           </div>
                           {/* <div className="mt-2">
                              <Form.Group controlId="exampleFormControlTextareaactionToSolve">
                                 <label
                                    for="exampleFormControlTextareaactionToSolve"
                                    class="form-label">
                                    Action To Solve
                                 </label>
                                 <textarea
                                    className="textArea"
                                    id="exampleFormControlTextareaactionToSolve"
                                    rows="5"
                                    value={actionToSolve}
                                    maxlength="950"
                                    onChange={(e) =>
                                       this.setState({ actionToSolve: e.target.value })
                                    }
                                    placeholder="Enter Action to Solve"></textarea>
                                 <Text
                                    color="dangerText"
                                    size="xSmall"
                                    text={error.actionToSolve}
                                 />
                              </Form.Group>
                           </div> */}
                        </Col>
                     </Row>

                     {/*
                    <Row>
                        <Col lg="12 mt-3">
                        <div className = "NotifyUser d-flex justify-content-center">
                                <CheckBoxComponent id="NotifyUserViaEmail" value="" 
                                    checked ={notify} 
                                    onChange = {this.handleCheckBoxChange}
                                />
                                <Text size="small" color="secondryColor" text="Notify user via Email"  className="ml-2"/>
                                
                        </div>
                        </Col>
    
                    </Row>
    */}
                     <Row className="justify-content-center ">
                        <Col lg="3">
                           <Buttons
                              name="Create"
                              varient="primary"
                              type="submit"
                              size="Small"
                              color="white"
                              disabled={buttonDisable}
                           />
                        </Col>
                     </Row>
                  </form>
               </div>
            </div>
         </>
      );
   }
}

export default CreateTicket;
