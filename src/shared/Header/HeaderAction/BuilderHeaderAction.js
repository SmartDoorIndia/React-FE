/** @format */

import './HeaderAction.scss';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import searchIcon from '../../../assets/images/search-icon.svg';
import settingIcon from '../../../assets/images/setting-icon.svg';
import profile from '../../../assets/svg/avatar_sml.svg';
import Image from '../../../shared/Image/Image';

import { useUserContext } from '../../../common/helpers/Auth';

const BuilderHeaderAction = (props) => {
  const { logoutUser } = useUserContext();

  function logout() {
    logoutUser();
  }

  return (
    <>
      <div className="headerAction">
        <div className="d-flex  align-items-center">
          <Image
            name="searchIcon"
            src={ searchIcon }
            onClick={ () => alert('Under development') }
          />
          {/* <div className="inputField" onClick={ () => alert('Under development') }>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Search..." />
            </Form.Group>
          </div> */}
          <div className="mr-3 actionButton" onClick={ () => alert('Under development') }>
            <Image name="settingIcon" src={ settingIcon } />
          </div>
          <div className="actionButton profileAction">
            <Image name="profile" src={ profile } />
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

export default BuilderHeaderAction;
