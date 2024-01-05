/** @format */

import React from 'react';
import './Appointment.scss';
import userImg from '../../assets/svg/avatar_sml.svg';
import { dateWithFormate, handleStatusElement } from '../../common/helpers/Utils';
import Image from '../Image';
import { Link } from 'react-router-dom';

export default function Appointment(model) {
  const { appointmentData } = model.data;

  const { startDate, endDate } = appointmentData;
  const meetingStartEndTime = `${ dateWithFormate(startDate, 'hh:mm') } - ${ dateWithFormate(
      endDate,
      'hh:mm',
  ) }`;

  return (
    <div className="showtime-preview fs12">
      <div className="d-flex justify-content-between pt-1">
        <b>
          For {appointmentData.requestType ? appointmentData.requestType.replace(/\s+/g, '-').capitalize() : '-'}
        </b>
        <div className="status">{handleStatusElement(appointmentData.status)}</div>
      </div>

      <p className="">{meetingStartEndTime || '-'}</p>
      <div className="c-user d-flex align-items-center mt-2 mb-2">
        <Image
          src={ appointmentData.profileImage ? appointmentData.profileImage : userImg }
          name="Profile Image"
        />
        <div className="flex-1 ml-2">
          {appointmentData.postedByName || appointmentData.karzaName || '-'}
        </div>
      </div>
      <p className="mb-0">{appointmentData.mobile || '-'}</p>
      {/* <p className="mb-0 elipsis-text"> */}
      {/* userRequestId: 522 || null*/}
          <Link  to={{ pathname: "/admin/execution/installation-detail",
                      state: {taskId : appointmentData.userRequestId !== null ?appointmentData.userRequestId: '' } }}> 
              {/* <Image name="useraddIcon" src={contentIcon} /> */}
              <p className="mb-0 elipsis-text">
              {appointmentData.houseNumber ?
               appointmentData.houseNumber + ', ' + `${appointmentData.societyName === null ? '': appointmentData.societyName},` + appointmentData.address :
               appointmentData.address || '-'}
              </p>
        </Link>
        {/* {appointmentData.houseNumber ?
               appointmentData.houseNumber + ', ' + `${appointmentData.societyName === null ? '': appointmentData.societyName},` + appointmentData.address :
               appointmentData.address || '-'} */}
      {/* </p> */}
      <p className="mb-0">{appointmentData?.propertyType !== null ? appointmentData.propertyType :''}</p>
      <div></div>
    </div>
  );
}
