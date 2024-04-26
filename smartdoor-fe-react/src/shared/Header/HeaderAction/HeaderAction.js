/** @format */
import React, { useState } from 'react'
import './HeaderAction.scss';

import Dropdown from 'react-bootstrap/Dropdown';

import bellIcon from '../../../assets/svg/bell.svg';
import profile from '../../../assets/svg/avatar_sml.svg';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from '../../../shared/Image/Image';

import { useSocket } from '../../../common/helpers/SocketProvider';
import { useUserContext } from '../../../common/helpers/Auth';
import NotificationModal from '../../Modal/NotificationModal/NotificationModal';
import { ToolTip, getLocalStorage } from '../../../common/helpers/Utils';
import { revokeToken } from '../../../common/redux/actions';

const HeaderAction = (props) => {
  const { disconnectSocket, socket } = useSocket();
  const { logoutUser } = useUserContext();
  const [show, setShow] = useState(false)
  const userData = getLocalStorage("authData")

  function logout() {
    props._handleCallReject();
    props._handleCallEnd();
    disconnectSocket(socket);
    revokeToken();
    logoutUser();
  }
  const handleClose = () => {
    setShow(false)
}

  return (
    <>
    <NotificationModal show={show} handleClose={handleClose} />
      <div className="headerAction">
        <div className="d-flex  align-items-center">
          {/* <Image
            name="searchIcon"
            src={ searchIcon }
            onClick={ () => alert('Under development') }
          />
          <div className="inputField" onClick={ () => alert('Under development') }>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Search..." />
            </Form.Group>
          </div> */}
          {/* <div className="mr-3 actionButton" }>
            <Image name="settingIcon" src={ settingIcon } />
          </div> */}
          <div className="mr-3 actionButton" onClick={ () => setShow(true) }>
            <Image name="bellIcon" src={ bellIcon } />
          </div>
          <div className="actionButton profileAction">
          <ToolTip position="bottom" style={{ width: '100%' }} name={userData?.roleName || ''}>
            <Image name="profile" src={ profile } />
            </ToolTip>
            <DropdownButton id="dropdown-basic-button" title="" menuAlign={ { sm: 'right' } }>
              <Dropdown.Item
                onClick={ () => {
                  logout();
                } }>
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAction;
