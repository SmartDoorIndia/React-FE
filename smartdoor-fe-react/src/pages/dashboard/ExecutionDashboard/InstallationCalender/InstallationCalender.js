/** @format */

import React, { Component, memo } from "react";
import Calender from "../../../../shared/Calender/Calender";
import { getExecutiveCalendar, changeInstallationAssignee, getAllInstallationCity,  getInstallationLocationByCity, getAllCityWithId } from "../../../../common/redux/actions";
import {
   getCurrentWeek,
   dateWithFormate,
   createDate,
} from "../../../../common/helpers/Utils";
import { FallBackLoader } from "../../../../common/helpers/Loader";
import moment from "moment";
import notify from "devextreme/ui/notify";
import Form from 'react-bootstrap/Form';
import './InstallationCalender.scss';
import { connect } from "react-redux";
import { compose } from "redux";
import { allCitiesWithId } from "../../../../common/redux/reducers/dashboard.reducer";

class InstallationCalender extends Component {
   constructor() {
      super();
      this.state = {
         calenderData: [],
         currentWeekData: [],
         userArr: [],
         firstDay: "",
         lastDay: "",
         loading: false,
         itemData: {},
         city: '',
         pincode: '',
         allLocationsByCity: [],
         allCities: [],
         allCitiesWithId: [],
      };
      this._parseCalenderData = this._parseCalenderData.bind(this);
      // this.getAllInstallationCity = this.getAllInstallationCity.bind(this);
   }

   componentDidMount() {
      let week = this.formateWeek(moment().format());
      this.setState({ firstDay: week.firstDay, lastDay: week.lastDay });
      this._getCalenderData(week);
      //getAllInstallationCity
      this.props.getAllCityWithId({stateId: null, smartdoorServiceStatus: true})
      .then((response) => {
         console.log(response)
         if(response.data.status === 200) {
            this.setState({allCitiesWithId: (response.data.resourceData)})
            console.log(this.state.allCitiesWithId)
         }
      });
      // console.log(allCitiesWithId)
      // getAllInstallationCity()//this.state.city
      //    .then(res=> {
      //       if(res.data && res.data.status === 200){
      //          console.log("res:",res.data)
      //          // locations = res.data.resourceData.locations.map(city_location => city_location.location);
      //          //console.log("locations..@@1", locations);
      //          this.setState({allCities: res.data.resourceData.cities})
      //       }})
      //       .catch(err=> console.log("err:", err));
      // getInstallationLocationByCity({city: "Pune"})//this.state.city
      //    .then(res=> {
      //       if(res.data && res.data.status === 200){
      //          console.log("res:",res.data)
      //          // locations = res.data.resourceData.locations.map(city_location => city_location.location);
      //          // console.log("locations..@@1", locations);
      //          this.setState({allLocationsByCity: res.data.resourceData.locations})
      //       }})
      //       .catch(err=> console.log("err:", err));
      //}
   }

   componentWillUnmount() {
      this.setState({ currentWeekData: [], userArr: [] });
   }

   formateWeek(date) {
      let currentWeek = getCurrentWeek(date);
      let firstDay = dateWithFormate(currentWeek.firstday, "YYYY-MM-DD");
      let lastDay = dateWithFormate(currentWeek.lastday, "YYYY-MM-DD");
      console.log("$$",firstDay,lastDay)
      return { firstDay, lastDay };
   }

   _getCalenderData({ firstDay, lastDay }) {
      this.setState({ loading: true });
      let city = this.props.location.state ? this.props.location.state.city || "" : "";

      try {
         getExecutiveCalendar({ weekStartDate: firstDay, weekEndDate: lastDay, city  })
            .then((response) => {
               if (response && response.status === 200) {
                  if (response.data.resourceData) {
                     let newDate = moment().format();
                     this._parseCalenderData(response.data.resourceData.currentWeek, newDate);
                     this.setState({
                        currentWeekData: response.data.resourceData.currentWeek,
                        loading: false,
                     });
                  }
               }
            })
            .finally(() => {
               this.setState({ loading: false });
            });
      } catch (e) {
         /* Error */
      }
   }

   _getFilteredCalenderData( firstDay = '', lastDay='' , city ='') {
      this.setState({ loading: true });
      // let city = this.props.location.state ? this.props.location.state.city || "" : "";

      try {
         getExecutiveCalendar({ weekStartDate: this.state.firstDay, weekEndDate: this.state.lastDay, city })
            .then((response) => {
               if (response && response.status === 200) {
                  if (response.data.resourceData) {
                     let newDate = moment().format();
                     this._parseCalenderData(response.data.resourceData.currentWeek, newDate);
                     this.setState({
                        currentWeekData: response.data.resourceData.currentWeek,
                        loading: false,
                     });
                  }
               }
            })
            .finally(() => {
               this.setState({ loading: false });
            });
      } catch (e) {
         /* Error */
      }
   }

   _parseCalenderData(_data, _newDate) {
      // console.log(_data,"ddddddddddddddddddddddddddddddddddddddddddd")
      if (_data.length) {
         var installationData = [];
         var userArr = [];
         // var todayDate = formateDate(_newDate);
         // var filterData = _data.filter((item)=> formateDate(item.date) == todayDate);

         if (_data.length) {
            _data.map((_value) => {
               if (_value.executivePerson.length) {
                  _value.executivePerson.map((_executive_) => {
                     // console.log(_executive_,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                     userArr.push({
                        text: _executive_.salesPersonName,
                        id: _executive_.executivePersonId,
                        city: _executive_.cities,
                     });
                     _executive_.timeSlot.map((_slots_) => {
                        if (_slots_.booked) {
                           installationData.push({
                              ..._slots_,
                              startDate: createDate(_value.date, _slots_.time, false), //Time Slot's Start Time
                              endDate: createDate(_value.date, _slots_.time, true), //Time Slot's End Time
                           }); // Installation data of Installation executive
                        }
                     });
                  });
               }
            });
         }

         let filteredList = [...new Set(userArr.map(JSON.stringify))].map(JSON.parse);
         this.setState({ calenderData: installationData, userArr: filteredList });
      }
   }

   _onDateChange = (_value) => {
      if (_value.name === "currentDate") {
         const week = this.formateWeek(_value.value);
         if (week.firstDay !== this.state.firstDay) {
            this.setState({ firstDay: week.firstDay, lastDay: week.lastDay });
            this._getCalenderData(week);
         }
      }
   };

   isValidCell(cellData, oldCellData) {
      const time = dateWithFormate(cellData.startDate, "HH");
      const currentTime = dateWithFormate(moment().format(), "HH");
      const oldTime = dateWithFormate(oldCellData.startDate, "HH");

      console.log(cellData, oldCellData, time);

      let valid = false;
      let message = "";

      // let timeCheck = Number(time) % 2;

      let filterData = this.state.calenderData.filter(
         (item) =>
            item.startDate === cellData.startDate &&
            item.executivePersonId === cellData.executivePersonId
      );

      let filterExecutive = this.state.userArr.filter(
         (item) => item.id === cellData.executivePersonId
      );

      // var todayDate = moment(moment(), "DD-MM-YYYY");
      // var futureDate = moment(cellData.startDate, "DD-MM-YYYY") //.format('DD-MM-YYYY');

      var todayDate = moment().format("DD-MM-YYYY");
      todayDate = moment(todayDate, "DD-MM-YYYY");
      var futureDate = moment(cellData.startDate).format("DD-MM-YYYY");
      futureDate = moment(futureDate, "DD-MM-YYYY");
      var oldDate = moment(oldCellData.startDate).format("DD-MM-YYYY");
      oldDate = moment(oldDate, "DD-MM-YYYY");

      // let isFutureDate = todayDate.diff(futureDate);

      // if(moment(todayDate).isSame(futureDate) && moment(todayDate).isBefore(oldDate)) {
      // 	if( Math.abs(Number(time) - Number(currentTime)) <= 1 ) {
      // 		valid = true;
      // 		message = "Can't assign within one 1hr";
      // 	}

      // 	if ( Number(time) === Number(currentTime) ||   Number(time) === Number(currentTime)+1) {
      // 		valid = true;
      // 		message = "Can't assign task in current time";
      // 	}

      // 	if ( Number(time) < Number(currentTime) ) {
      // 		valid = true;
      // 		message = "Can't assign task in past time";
      // 	}
      // }

      if (moment(todayDate).isSame(futureDate)) {
         if (Number(time) < Number(currentTime)) {
            valid = true;
            message = "Can't assign task in past time";
         }

         if (
            Number(oldTime) === Number(currentTime) ||
            Number(oldTime) === Number(currentTime) + 1
         ) {
            valid = true;
            message = "Can't assign task in current time";
         }

         if (Math.abs(Number(oldTime) - Number(currentTime)) <= 1) {
            valid = true;
            message = "Can't assign within one 1hr";
         }

         if (Math.abs(Number(time) - Number(currentTime)) <= 1) {
            valid = true;
            message = "Can't assign within one 1hr";
         }
      } else if (moment(todayDate).isBefore(futureDate)) {
         if (oldDate === todayDate) {
            if (Math.abs(Number(oldTime) - Number(currentTime)) <= 1) {
               valid = true;
               message = "Can't assign within one 1hr";
            }

            if (
               Number(oldTime) === Number(currentTime) ||
               Number(oldTime) === Number(currentTime) + 1
            ) {
               valid = true;
               message = "Can't assign task in current time";
            }
         }

         if (oldDate !== todayDate && oldDate !== futureDate) {
            valid = false;
         }
      }
      // console.log(filterExecutive,cellData,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      if (filterExecutive.length) {

         const executiveCities = filterExecutive[0]?.city[0]?.split(",") || [];

          // Check if the cellData's city matches any of the cities in the executiveCities array
         if (!executiveCities.some(city => city.trim().toLowerCase() === cellData?.city?.toLowerCase())) {
         valid = true;
         message = "Can't assign to other city Executive";
         }

         // if (filterExecutive[0]?.city?.toLowerCase() !== cellData?.city?.toLowerCase()) {
         //    valid = true;
         //    message = "Can't assign to other city Executive";
         // }
      }

      if (Number(time) >= 21) {
         valid = true;
         message = "Can't assign task after 9pm";
      }

      // if (!timeCheck) {
      // 	valid = true;
      // 	message = "Please assign to correct time slot";
      // }

      if (filterData.length) {
         valid = true;
         message = "Can't assign to already occupied slot";
      }

      if (cellData.status === "COMPLETED") {
         valid = true;
         message = "Can't assign Completed tasks.";
      }

      if (moment(todayDate).isAfter(futureDate)) {
         valid = true;
         message = "Can't perform assignment in past dates";
      }

      if (message) notify(message, "warning", 1000);

      return valid;
   }

   _handleChangeAssignee = (_value) => {
      let { newData, oldData } = _value;
      let time = dateWithFormate(newData.startDate, "HH");
      let timeCheck = Number(time) % 2;

      if (!timeCheck) {
         newData = {
            ...newData,
            startDate: moment(newData.startDate).subtract(1, "H").format(),
            endDate: moment(newData.endDate).subtract(1, "H").format(),
         };
      }

      if (this.isValidCell(newData, oldData)) {
         _value.cancel = true;
      } else {
         if (!timeCheck) {
            let data = this.state.calenderData;
            data.map((value, index) => {
               if (value.userRequestId === newData.userRequestId) {
                  data[index] = newData;
               }
            });
            this.setState({ calenderData: data });
         }

         let date = dateWithFormate(newData.startDate, "YYYY-MM-DD");
         let time = dateWithFormate(newData.startDate, "HH:mm:ss");
         var data = {
            userRequestId: newData.userRequestId,
            executivePersonId: newData.executivePersonId,
            timeSlot: time,
            userRequestDate: date,
            city: newData.city,
         };
         changeInstallationAssignee(data);
      }
   };


   render() {
      // const {allCitiesWithId} = this.props
      return (
         <div>
            {this.state.loading ? <FallBackLoader /> : null}
            <div className="button-top-section">
               <div></div>
               <div className="d-flex installation-filter">
                  {/* <Buttons
                     name={  "Approve"}
                     type="submit"
                     size="Small"
                     color="primary"
                     className="w-100 float-right  mr-2"
                     // onClick={() => {
                     //    if (advsiorStatus === "ACCEPTED") {
                     //       return false;
                     //    } else {
                     //       handleRealtorStatus(advisor.advisorId, "ACCEPTED");
                     //    }
                     // }}
                  /> */}
                  {/* <Buttons
                     name={ "Block"}
                     type="submit"
                     size="Small"
                     color="primary"
                     className="w-100 float-right "
                     // onClick={() => {
                     //    handleModalShow();
                     //    setBlockData({ id: advisor.advisorId, status: advsiorStatus });
                     // }}
                  /> */}
                  <div className="locationSelect d-flex1">
                      <Form.Group controlId="exampleForm.SelectCustom" className="d-flex align-items-center mr-2">
                          {/* <Form.Label className="mr-2">City:</Form.Label> */}
                            <Form.Control className="form-installation" as="select" 
                            onChange={(e)=> {
                                  this._getFilteredCalenderData(this.state.firstDay,this.state.lastday, e.target.value, "")
                              this.setState({ city: e.target.value , allLocationsByCity: []});
                              // getInstallationLocationByCity({ city: e.target.value })
                              // .then((res) => {
                              //    if (res.data && res.data.status === 200) {
                              //       const locationsByCity = res.data.resourceData.locations.map(loc=>{
                              //          return {...loc, location: `${loc.location} ,${loc.pinCode}` }
                              //       })
                                    
                              //       this.setState({
                              //          // allLocationsByCity: res.data.resourceData.locations,
                              //          allLocationsByCity: locationsByCity,
                              //       });
                              //    }
                              // })
                              // .catch((err) => console.log("err:", err));
                            }}
                            >
                                <option value="">Select City</option>
                                {/* <option value="Pune">Pune</option>
                                <option value="Mumbai">Mumbai</option> */}
                                {this.state.allCitiesWithId?.length
                                    ? this.state.allCitiesWithId?.map((city) => (
                                       <option key={city.cityId} value={city.cityId}>
                                          {city.cityName}
                                       </option>
                                    ))
                                    : null}
                            </Form.Control>
                      </Form.Group>
               </div>
                          {/* <Form.Label className="mr-2">Location:</Form.Label> */}
                  {/* <div className="locationSelect">
                      <Form.Group controlId="exampleForm.SelectCustom"  className="d-flex align-items-center">
                            <Form.Control as="select" 
                            className="locationWidth form-installation"
                            onChange={(e)=> {
                              this._getFilteredCalenderData(this.state.firstDay,this.state.lastday, this.state.city ,e.target.value)
                              this.setState({pincode : e.target.value})
                            }}
                            >
                                <option value="">Select Location</option>
                                {
                                    this.state.allLocationsByCity && this.state.allLocationsByCity.length ? 
                                    this.state.allLocationsByCity.map((_value, index)=>
                                        <option key={_value.pinCode} value={_value.pinCode}>{`${_value.location}`}</option>
                                        ) 
                                    : null 
                                }
                            </Form.Control>
                      </Form.Group>
               </div> */}
               </div>
            </div>
            <Calender
               data={this.state.calenderData}
               _onDateChange={this._onDateChange}
               userNames={this.state.userArr}
               onAppointmentUpdating={this._handleChangeAssignee}
            />
         </div>
      );
   }
}

const mapStateToProps = ({ allCitiesWithId }) => ({
   allCitiesWithId
});

const actions = {
   getAllCityWithId
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(InstallationCalender);
