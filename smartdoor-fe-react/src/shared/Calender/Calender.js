/** @format */

import React, { memo } from 'react';

import Scheduler, { Resource } from 'devextreme-react/scheduler';
import Appointment from './Appointment.js';
import AppointmentTooltip from './AppointmentTooltip.js';
import { formateDate, dateWithFormate } from '../../common/helpers/Utils';

import { TimeCell, DataCell } from './DateTimeCell.js';

import { getIntallationRequestSlots, getExecutiveList } from '../../common/redux/actions';
import moment from 'moment';
import notify from 'devextreme/ui/notify';

const currentDate = new Date();
const views = [ 'day' ];
const groups = [ 'executivePersonId' ];

const Calender = (props) => {
  console.log(props.data);

  // const holidays = [
  //   new Date(2022, 12, 21),
  //   new Date(2022, 12, 22),
  // ];

  const customizeDateNavigatorText = (e) => {
    console.log("customizeDateNavigatorText:", e.startDate)
    return formateDate(e.startDate);
  };

  function renderTimeCell(itemData) {
    return <TimeCell itemData={ itemData } />;
  }

  // const applyDisableDatesToDateEditors = (form) => {
  //   const startDateEditor = form.getEditor('startDate');
  //   startDateEditor.option('disabledDates', holidays);

  //   // const endDateEditor = form.getEditor('endDate');
  //   // endDateEditor.option('disabledDates', holidays);
  // };

  return (
    <Scheduler
      className="cc_style"
      timeZone="Asia/Kolkata"
      dataSource={ props.data }
      views={ views }
      defaultCurgroupsrentView="day"
      defaultCurrentDate={ currentDate }
      groups={ groups }
      height={ 600 }
      firstDayOfWeek={ 0 }
      startDayHour={ 7 }
      endDayHour={ 22 }
      showAllDayPanel={ false }
      crossScrollingEnabled={ true }
      cellDuration={ 60 }
      editing={ { allowAdding: false } }
      showCurrentTimeIndicator={ false }
      maxAppointmentsPerCell="1"
      appointmentComponent={ Appointment }
      appointmentTooltipComponent={ AppointmentTooltip }
      onAppointmentFormOpening={ onAppointmentFormOpening }
      onOptionChanged={ (e) => {
        props._onDateChange(e);
      } }
      customizeDateNavigatorText={ customizeDateNavigatorText }
      timeCellRender={ renderTimeCell }
      dataCellComponent={ DataCell }
      width="auto"
      valueChangeEvent="keyup"
      onAppointmentUpdating={ props.onAppointmentUpdating }>
      <Resource dataSource={ props.userNames } fieldExpr="executivePersonId" />
    </Scheduler>
  );
  

  async function onAppointmentFormOpening(data) {
    const form = data.form;
    let startDate = data.appointmentData.startDate;

    form.option('items', [
      {
        label: {
          text: 'Edit Calendar',
        },
        cssClass: 'instaFormTitle',
      },
    ]);

    const slotReq = {
      city: data.appointmentData.city,
      propertyId: data.appointmentData.propertyId,
      slotDate: dateWithFormate(startDate, 'YYYY-MM-DD'),
    };

    let timeSlot = []; // ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];
    let executiveArr = []; // ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];
    let getExecTime = '';
    const getExecutives = async (date, timeSlot) => {
      try {
        if (date && timeSlot) {
          const reqData = {
            date: date,
            timeSlot: timeSlot,
            city: data.appointmentData.city,
            userRequestId: data.appointmentData.userRequestId
          };
          const response = await getExecutiveList(reqData);
          if (response.length) {
            executiveArr = await response;
            customEditForm(executiveArr);
          } else customEditForm(executiveArr);
        } else {
          executiveArr = [];
        }
      } catch (e) {
        console.log(e);
        executiveArr = [];
        customEditForm(executiveArr);
      }
    };

    const getSlots = async (value) => {
      try {
        const arr = [];
        const response = await getIntallationRequestSlots(value);
        if (response && response.length) {
          await response.map((item) => arr.push(item.timeSlot));
        }
        timeSlot = await arr;
        await customEditForm();
      } catch (e) {
        console.log(e);
        timeSlot = [];
      }
    };

    await getSlots(slotReq);

    async function customEditForm(executiveArr = []) {  
      if (timeSlot.length === 0) executiveArr = [];

      await form.option('items', [
        {
          label: {
            text: 'Edit Calendar',
          },
          cssClass: 'instaFormTitle',
        },
        {
          label: {
            text: '',
          },
        },
        {
          label: {
            text: 'Select Date'
          },
          cssClass: 'instaFormFields customRadiodropdown',
          dataField: 'startDate',
          itemType: 'simple',
          editorType: 'dxDateBox',
          editorOptions: {
            displayExpr: 'text',
            width: '100%',
            onValueChanged: async (args) => {
              if (
                dateWithFormate(startDate, 'YYYY-MM-DD') !==
                        dateWithFormate(args.value, 'YYYY-MM-DD')
              ) {
                await getSlots({
                  ...slotReq,
                  slotDate: dateWithFormate(args.value, 'YYYY-MM-DD'),
                });
                form.updateData('timeSlot', '');
                form.updateData('executivePersonId', '');
                getExecTime = '';
                // if(getExecTime){
                //   getExecutives(dateWithFormate(args.value, "YYYY-MM-DD"), getExecTime)
                // }
              }
              startDate = args.value;
            },
          },
        },
        {
          label: {
            text: '',
          },
          // render:()=>{return (<div>div</div>)}
        },
        {
          label: {
            text: 'Select Time Slot',
          },
          dataField: 'timeSlot',
          isRequired: true,
          cssClass: 'instaFormFields customRadioTime',
          editorType: 'dxRadioGroup',
          editorOptions: {
            dataSource: await timeSlot,
            width: '100%',
            itemTemplate: function(itemData) {
              return `${ itemData }`;
            },
            onValueChanged: function(args) {
              let date;
              let slot;
              let endDate;
              let time;
              let timeData;
              try {
                if (args.value) {
                  timeData = timeSlot.filter((item) => item === args.value);
                  getExecTime = timeData.length ? timeData[ 0 ].split('-')[ 0 ] : '';
                  getExecTime = moment(getExecTime, [ 'h:mm A' ]).format('HH:mm') + ':00';
                  time = args.value.split('-');
                  date = dateWithFormate(startDate, 'YYYY-MM-DD');
                  time = moment(time, [ 'h:mm A' ]).format('HH:mm');
                  slot = `${ date } ${ time }`;
                  startDate = moment(slot, 'YYYY-MM-DD HH:mm').format();
                  endDate = moment(slot, 'YYYY-MM-DD HH:mm').add(2, 'hours').format();
                  getExecutives(date, getExecTime);
                  form.updateData('startDate', startDate);
                  form.updateData('endDate', endDate);
                  form.updateData('timeSlot', args.value);
                }
              } catch (e) {
                notify('Facing some isssue. Please try again later.', 'error', 1000);
              }
            },
          },
        },
        {
          label: {
            text: '',
          },
        },
        {
          label: {
            text: 'Assign To',
          },
          editorType: 'dxSelectBox',
          cssClass: 'instaFormFields',
          dataField: 'executivePersonId',
          isRequired: true,
          editorOptions: {
            width: '100%',
            items: executiveArr,
            displayExpr: 'name',
            valueExpr: 'id',
            onValueChanged: function(args) {},
          },
        },
      ]);
    }

    customEditForm();
    // applyDisableDatesToDateEditors(form);
  }
  
};

export default memo(Calender);
 