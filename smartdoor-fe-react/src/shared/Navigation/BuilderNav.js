/** @format */

import "./Navigation.scss";

import * as ReactBoostrap from "react-bootstrap";
import Image from "../Image/Image";
import sideLogo from "../../assets/images/sidebar-logo.svg";
import { Link } from "react-router-dom";
import brokerActive from "../../assets/svg/broker-active.svg";

const BuilderNav = ({ builderProjectSubPostId }) => {
   return (
      <div className="mainMenu">
         <ReactBoostrap.Navbar expand="lg">
            <ReactBoostrap.Navbar.Brand href="/admin/sales">
               <Image name="Logo" src={sideLogo} />
            </ReactBoostrap.Navbar.Brand>
            <ReactBoostrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactBoostrap.Navbar.Collapse id="basic-navbar-nav">
               <ReactBoostrap.Nav className="mr-auto">
                  {/* <Link to="/admin/user-management" className={"nav-link"}>
                     <Image name="teamGroup" src={brokerActive} />
                     Projects
                  </Link>
                  <Link to="/admin/user-management" className={"nav-link"}>
                     <Image name="teamGroup" src={brokerActive} />
                     Manage Users
                  </Link> */}
                  <Link to="/builder/detail" className={"nav-link"}>
                     <Image name="teamGroup" src={brokerActive} />
                     Builder Details
                  </Link>
                  <Link to="/builder/Posting-Property" className={"nav-link"}>
                     <Image name="teamGroup" src={brokerActive} />
                     Posting Property
                  </Link>
                  <Link to="/builder/project/Posting" className={"nav-link"}>
                     <Image name="teamGroup" src={brokerActive} />
                     Projects Posting
                  </Link>

                  <Link to={`/builder/Project-details/`} className={"nav-link"}>
                     <Image name="teamGroup" src={brokerActive} />
                     Project Details
                  </Link>
               </ReactBoostrap.Nav>
            </ReactBoostrap.Navbar.Collapse>
         </ReactBoostrap.Navbar>
      </div>
   );
};

export default BuilderNav;
