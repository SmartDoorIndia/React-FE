/** @format */

import React from 'react';
import edit from '../../assets/images/edit-icon.svg';
import userImg from '../../assets/svg/avatar_sml.svg';
import Buttons from '../Buttons/Buttons';
import './Appointment.scss';
import { dateWithFormate, formateDate } from '../../common/helpers/Utils';
import Image from '../Image';

export default class AppointmentTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentData: props.data.appointmentData,
    };
    // Globalize.locale('en');
  }

  render() {
    const { appointmentData } = this.state;
    const { startDate, endDate } = appointmentData;
    const meetingStartEndTime =
         startDate && endDate ?
            `${ dateWithFormate(startDate, 'hh:mm') } - ${ dateWithFormate(endDate, 'hh:mm') }` :
            '-';

    return (
      <div className="movie-tooltip">
        <div className="d-flex align-items-center mb-2 justify-content-between p-2">
          <h6 className="mb-0">{formateDate(appointmentData.startDate)}</h6>
          <Buttons
            iconSrc={ edit }
            name="Edit"
            varient="secondary"
            type="submit"
            size="Small"
            color="secondaryColor"
          />
        </div>
        <div className="fs12 toolTipBox">
          <b>
            For {appointmentData.requestType ? appointmentData.requestType.replace(/\s+/g, '-').capitalize() : '-'}
          </b>
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
          <p className="mb-0 address">
          {appointmentData.houseNumber ?
               appointmentData.houseNumber + ', ' + `${appointmentData.societyName === null ? '': appointmentData.societyName},` + appointmentData.address :
               appointmentData.address || '-'}

          </p>
          <p className="mb-0">{appointmentData.propertyType || '-'}</p>
        </div>
      </div>
    );
  }
}
