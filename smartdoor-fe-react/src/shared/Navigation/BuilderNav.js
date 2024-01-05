import './Navigation.scss';

import * as ReactBoostrap from 'react-bootstrap';
import Image from '../Image/Image';
import sideLogo from '../../assets/images/sidebar-logo.svg';
import { Link } from 'react-router-dom';
import brokerActive from '../../assets/svg/broker-active.svg';

const BuilderNav = () => {
  return (
    <div className="mainMenu">
      <ReactBoostrap.Navbar expand="lg">
        <ReactBoostrap.Navbar.Brand href="/admin/sales">
          <Image name="Logo" src={ sideLogo } />
        </ReactBoostrap.Navbar.Brand>
        <ReactBoostrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBoostrap.Navbar.Collapse id="basic-navbar-nav">
          <ReactBoostrap.Nav className="mr-auto">
            <Link
              to='/admin/user-management'
              className={ 'nav-link' }>
              <Image name="teamGroup" src={ brokerActive } />
              Projects
            </Link>
            <Link
              to='/admin/user-management'
              className={ 'nav-link' }>
              <Image name="teamGroup" src={ brokerActive } />
              Manage Users
            </Link>

          </ReactBoostrap.Nav>
        </ReactBoostrap.Navbar.Collapse>
      </ReactBoostrap.Navbar>
    </div>
  )
}

export default BuilderNav;
